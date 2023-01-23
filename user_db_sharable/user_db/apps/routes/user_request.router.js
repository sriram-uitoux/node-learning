module.exports = app => {
    const user_request = require('../controllers/user_request.controller.js');
    let router = require('express').Router();

    router.post("/create/", user_request.add_request);
    router.get("/view/", user_request.get_all_requests);

    app.use('/api/request', router);
};