// Ref for swagger: https://medium.com/bb-tutorials-and-thoughts/how-to-add-swagger-to-nodejs-rest-api-7a542cfdc5e1

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const userSwaggerDocument = require("./swagger/users.swagger.json")
const userRequestSwaggerDocument = require("./swagger/user_request.swagger.json");


const users_db = require("./apps/models");

const app = express();
const corsOption = {
    origin: "http://localhost:8081"
};


app.use(express.json());
app.use(express.urlencoded( {extended:true} ));
app.use(cors(corsOption));
app.use('/api-docs-users', swaggerUi.serve, swaggerUi.setup(userSwaggerDocument));
app.use('/api-docs-requests', swaggerUi.serve, swaggerUi.setup(userRequestSwaggerDocument));

users_db.sequelize
            .sync()
            .then(() => {console.log('E-Commerce DB is synced')})
            .catch(error => {console.log(`Failed to Sync. ecommerce DB - ${error}`)});

// users_db.sequelize
//             .sync( {force:true} )
//             .then(() => {console.log('E-Commerce DB is dropped and synced')})
//             .catch(error => {console.log(`Failed to drop and Sync. ecommerce DB - ${error}`)});

app.get('/', (req, res, next) => {
    res.status(200)
       .send('FrontEnd connected');
});

require('./apps/routes/user.route.js')(app);
require('./apps/routes/user_request.router.js')(app);

const PORT = process.env.PORT || 8080;
const server_error = new Error(`Something went wrong at server!`);
server_error.statusCode = 404;

app.listen(PORT, error => {
    if(!error) {
        console.log(`Server is running in PORT - ${PORT}`);
        return;
    } throw error;
});