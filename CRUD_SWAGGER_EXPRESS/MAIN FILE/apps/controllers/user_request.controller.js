const user_db = require("../models");
const Request = user_db.user_request;
const Op = user_db.Sequelize.Op;


// Add request
exports.add_request = async (req, res) => {
    const id = req.query.user;

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
        user_id: id
    };

    // Save in DB
    await Request.create(request)
                 .then(data => {res.status(200).send(data)})
                 .catch(error => {
                    res.status(500)
                    .send({message: error.message || `Something went wrong while creating a user with user_name ${user.user_name} `});
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

// Get a request by ID
exports.findOne = async (req, res) => {
    const id = req.params.id;

    await Request.findByPk(id)
                 .then(data => {
                    if (data) res.status(200).send(data);
                    else res.status(404)
                            .send(`Cannot find request with ID - ${id}`);})
                 .catch(error => {
                    res.status(500)
                       .send("Error while retriving the request..")
                 });
};

// Update a request by ID
exports.update = async (req, res) => {
    const id = req.params.id;

    await Request.update(req.body, {where: {id: id}})
                 .then(num => {
                    if (num == 1) res.status(200).send(`Request with ID - ${id} is updated!`);
                    else res.status(404)
                            .send(`Cannot find request with ID - ${id}`);})
                 .catch(error => {
                    res.status(500)
                       .send(`Error while updating the request!`);
                 });
};

// Delete a request by ID
exports.delete = async (req, res) => {
    const id = req.params.id;

    await Request.destroy({where: {id: id}})
                 .then(num => {
                    if (num == 1) res.status(200).send(`Request with ID - ${id} is deleted`);
                    else res.status(404)
                            .send(`Cannot find request with ID - ${id}`);})
                 .catch(error => {
                    res.status(500)
                       .send(`Error while updating the request!`);
                 });
};

// Delete all request
exports.deleteAll = async (req, res) => {
    await Request.destroy({
        where: {},
        truncate: false
    })
        .then(() => {res.status(200).send("All requests deleted!")})
        .catch(error => {
            res.status(500)
               .send("Error while deleting the all users!");}
               );
};

// Request filter by Priority
exports.findPriority = async (req, res) => {
    const hasPriority = req.query.priority
    let condition = hasPriority ? { hasPriority: { [Op.like]: `%${hasPriority}%` } } : null;

    await Request.findAll( {where:condition} )
                 .then(data => {res.status(200).send(data.length !== 0? data : "Choose correct option!")})
                 .catch(error =>{
                    res.status(500)
                       .send({message: error.message || "Error occured while fetching the requests"})   
                });
};