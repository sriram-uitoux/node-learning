module.exports = (sequelize,Sequelize) => {
    const UserRequest = sequelize.define("user_request", {
        "request": {
            type: Sequelize.TEXT
        },
        "hasPriority": {
            type: Sequelize.BOOLEAN
        }
    });
    return UserRequest;
};