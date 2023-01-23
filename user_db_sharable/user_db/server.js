const express = require('express');
const cors = require('cors');

const ecommerce_db = require("./apps/models");

const app = express();
const corsOption = {
    origin: "http://localhost:8081"
};


app.use(express.json());
app.use(express.urlencoded( {extended:true} ));
app.use(cors(corsOption));

ecommerce_db.sequelize
            .sync()
            .then(() => {console.log('User DB is synced')})
            .catch(error => {console.log(`Failed to Sync. ecommerce DB - ${error}`)});

// ecommerce_db.sequelize
//             .sync( {force:true} )
//             .then(() => {console.log('User DB is dropped and synced')})
//             .catch(error => {console.log(`Failed to drop and Sync. user DB - ${error}`)});

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