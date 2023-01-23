const user_db_config = require('../configs/user.db.config.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    user_db_config.DB,
    user_db_config.USER,
    user_db_config.PASSWORD,
    {
        host: user_db_config.HOST,
        dialect: user_db_config.dialect,
        // operatorsAliases : false,
        pool: {
            min: user_db_config.pool.min,
            max: user_db_config.pool.max,
            acquire: user_db_config.pool.acquire,
            idle: user_db_config.pool.idle,
        }
    }
);

const user_db = {};

user_db.sequelize = sequelize;
user_db.Sequelize = Sequelize;

user_db.user = require('../models/users.model.js')(sequelize,Sequelize);
user_db.user_request = require('./user_requests.js')(sequelize,Sequelize);

user_db.user.hasMany(user_db.user_request, {
    foreignKey: "user_id",
    as: "request"
});
user_db.user_request.belongsTo(user_db.user,{
    foreignKey: "user_id",
    as: "user"
});

module.exports = user_db;