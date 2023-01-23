const user_db = require("../models");
const Request = user_db.user_request;
const Op = user_db.Sequelize.Op;


// Add request
exports.add_request = async (req, res) => {
    // Validation
    if (!req.body.request) {
        res.status(400)
           .send('Request cannot be empty!');
        return;
    } 

    // Request creation
    const request = {
        request: req.body.request,
        hasPriority: req.body.hasPriority,
        user_id: req.body.user_id
    };

    // Save in DB
    await Request.create(request)
                 .then(data => {res.status(200).send(data)})
                 .catch(error => {
                    res.status(500)
                    .send({message: error.message || `Something went worng while creating a user with user_name ${user.user_name} `});
                });
};

// Get all requests
exports.get_all_requests = async (req, res) => {
    const request = req.query.request;
    let condition = request ? { request: { [Op.like]: `%${request}%` } } : null;
    await Request.findAll( {where:condition} )
              .then(data => {res.send(data)})
              .catch(error =>{
                res.status(500)
                   .send({
                        message: error.message || "Error occured while retriving data"
                    });
        });
};