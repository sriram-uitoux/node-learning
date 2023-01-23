module.exports = (sequelize,Sequelize) => {
    const User = sequelize.define("user", {
        "user_name": {
            type: Sequelize.STRING,
            unique: true
        },
        "password": {
            type: Sequelize.STRING
        },
        "first_name": {
            type: Sequelize.STRING
        },
        "last_name": {
            type: Sequelize.STRING
        },
        "mobile_number": {
            type: Sequelize.BIGINT,
            validate: {
                len: { args: [10,10], msg: "Invalid Mobile Number" },
                isAlphanumeric: { args: true, msg: "Check the mobile number" },
              }
        }
    });
    return User;
};