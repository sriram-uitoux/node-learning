const user_db = require("../models");
const User = user_db.user;
const Request = user_db.user_request;
const Op = user_db.Sequelize.Op;

// Create new user
exports.create = async (req, res) => {
    
    // Validation
    if (!req.body.user_name) {
        res.status(400)
           .send('User name cannot be empty!');
        return;
    } 

    // User creation
    const user = {
        "user_name": req.body.user_name,
        "password": req.body.password,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "mobile_number": req.body.mobile_number
    };

    // Save in DB
    await User.create(user)
              .then(data => {res.status(200).send(data)})
              .catch(error => {
                res.status(500)
                .send({message: error.message || `Something went worng while creating a user with user_name ${user.user_name} `});
            });
};

// Retrive User
exports.find_user = async (req, res) => {
    const user_name = req.query.user_name;
    let condition = user_name ? { user_name: { [Op.like]: `%${user_name}%` } } : null;
    await User.findAll( {where:condition} )
              .then(data => {res.send(data)})
              .catch(error =>{
                res.status(500)
                   .send({
                        message: error.message || "Error occured while retriving data"
                    });
        });
};

// Retrive a user using ID
exports.findOne = async (req, res) => {
    const id = req.params.id;

    await User.findByPk(id)
              .then(data => {
                if (data) res.send(data);
                else res.status(404)
                        .send({message: `Cannot find a user with ID - ${id}`});})
              .catch(error => {
                res.status(500)
                .send('Error occured while retriving the user');
                });
};

// Update a user using ID
exports.update = async (req, res) => {
    const id = req.params.id;

    await User.update(req.body, {where: {id:id}})
              .then(num => {
                if (num == 1) res.send({message: `ID - ${id} is updated`});
                else res.status(404)
                        .send(`User with ID - ${id} is not found`);
            })
              .catch(error => {
                res.status(500)
                .send(`Error occured while updating the user (${error})`)
            });
};

// Delete a user usig ID
exports.delete = async (req, res) => {
    const id = req.params.id;

    await User.destroy({where: {id:id}})
              .then(num => {
                if (num == 1) res.send({message: `ID - ${id} is deleted`});
                else res.status(404)
                        .send(`User is not found!`);
            })
              .catch(error => {
                res.status(500)
                .send(`Error occured while deleting the user (${error})`);
            });
};

// Delete a user usig ID
exports.deleteAll = async (req, res) => {

    await User.destroy({
        where: {},
        truncate:false
    })
        .then(num => {res.send({message: `All users are deleted`});})
        .catch(error => {
            res.status(500)
               .send(error.message || `Error occured while deleting the all users`);
        });
};

// One to Many
exports.getUserRequest = async (req, res) => {
    const id = req.params.id;
    await User.findAll({
        include: [{
            model: Request,
            as: "request"
        }],
        where: {id: id}
    })
    .then(data => res.send(data))
    .catch(error => {
        res.status(500)
        .send(`Error occured while retriving the user (${error})`);
        });
};