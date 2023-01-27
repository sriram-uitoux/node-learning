module.exports = app => {
    const user = require('../controllers/user.controller.js');
    let router = require('express').Router();

    router.post("/create/", user.create);
    router.get("/view/", user.find_user);
    router.get("/view/:id", user.findOne);
    router.put("/update/:id", user.update);
    router.delete("/delete/:id", user.delete);
    router.delete("/delete/", user.deleteAll);

    router.get("/search/user-requests/:id", user.getUserRequest);
    router.delete("/delete/user-requests/user/:id", user.deleteUserRequest);

    app.use('/api/users', router);
};