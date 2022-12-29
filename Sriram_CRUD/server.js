//Initilization
const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Test@123",
    database: "EmployeeDB",
    multipleStatements: true
});

//DB connection
app.get("/", (req, res) => {
    db.connect((err) => {
        if (!err){
            console.log("DataBase connected");
        }   else{
            console.log(err);
        }
    });
});

//CRUD
//READ
app.get('/employee/:id', (req, res) => {
    const read_emp = "SELECT * FROM employee WHERE employee_id = ?";
    db.query(read_emp, [req.params.id], (err, result) => {
        if (!err){
            res.send(result);
        }   else{
            console.log(err);
        }
    });
});

//DELETE
app.delete('/employee/:id', (req, res) => {
    const delete_emp = "DELETE FROM employee WHERE employee_id = ?";
    db.query(delete_emp, [req.params.id], (err, result) => {
        if (!err){
            res.send("Employee deleted");
        }   else{
            console.log(err);
        }
    });
});

//INSERT
app.post('/employee', (req, res) => {
    let cus = req.body;
    const insert_emp = "SET @employee_id = ?;SET @employee_name = ?;SET @employee_code = ?;SET @salary = ?; \
    CALL employee_update_insert(@employee_id,@employee_name,@employee_code,@salary);"
    db.query(insert_emp, [cus.employee_id,cus.employee_name,cus.employee_code,cus.salary], (err, result) => {
        if (!err){
            result.forEach(element =>{
                if(element.constructor == Array){
                    res.send(`Employee - ${element[0].employee_code} is added!`); 
                }
            });
        }   else{
            console.log(err);
        }
    });
});

//UPDATE
app.put('/employee', (req, res) => {
    let cus = req.body;
    const update_emp = "SET @employee_id = ?;SET @employee_name = ?;SET @employee_code = ?;SET @salary = ?; \
    CALL employee_update_insert(@employee_id,@employee_name,@employee_code,@salary);"
    db.query(update_emp, [cus.employee_id,cus.employee_name,cus.employee_code,cus.salary], (err, result) => {
        if (!err){
            result.forEach(element =>{
                if(element.constructor == Array){
                    res.send(`Employee - ${element[0].employee_code} is updated!`); 
                }
            });
        }   else{
            console.log(err);
        }
    });
});

//Server Connection
app.listen(3000, () => {
    console.log('Server connected');
});