module.exports = (sequelize,Sequelize) => {
    const User = sequelize.define("user", {
        "user_name": {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isUnique: (value, next) => {
                    User.findOne({where: {user_name: value}})
                        .then(user => {
                            if (user && this.id !== user.id){
                                return next("Username already exists!");
                            } return next();
                        })
                        .catch(error => {return next(error);});
                }
            }
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
                isUnique: (value, next) => {
                    User.findOne({where: {mobile_number: value}})
                        .then(num => {
                            if (num && this.id !== num.id){
                                return next("Mobile already exists!");
                            } return next();
                        })
                        .catch(error => {return next(error);});
                }
              }
        }
    });
    return User;
};