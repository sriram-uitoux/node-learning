module.exports = {
    DB: "user_details",
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Test@123",
    dialect: "mysql",

    pool: {
        min: 0,
        max: 5,
        acquire: 30000,
        idle: 10000
    }

};