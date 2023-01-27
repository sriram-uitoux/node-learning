module.exports = app => {
    const user_request = require('../controllers/user_request.controller.js');
    let router = require('express').Router();

    router.post("/create/", user_request.add_request);
    router.get("/view/", user_request.get_all_requests);
    router.get("/view/:id", user_request.findOne);
    router.put("/update/:id", user_request.update);
    router.delete("/delete/:id", user_request.delete);
    router.delete("/delete/", user_request.deleteAll);
    router.get("/priority-requests/", user_request.findPriority);

    app.use('/api/request', router);
};