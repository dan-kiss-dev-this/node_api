import express from 'express';
import db from './db/db';

//setup the express app, boot the server via babel-node for es5 by running $ node_modules/.bin/babel-node app.js 
//$ node app.js
const app = express();

//get all todos, note api endpoint provided as first parameter, 
//second parameter is function that runs everytime we hit the endpoint
//this function takes 2 parameters, which are req and res, the req object contains info about request,
//the res object contains information about the response and methods we can use to send information back to the client
//we chain methods here first .status(200) means a successful req/request occured 
//then .send({object,}) is used to send back a response to the client
//the resource (db) into the send as a parameter is what gets back to the client, here we have a object, 
//the todos property of the object contains the data we imported
app.get('/api/v1/todos', (req,res) => {
    res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        todos: db,
    })
});

//you will access the server at localhost:5000/api/v1/todos
const PORT = 5000;

//app listen creates a web server for us, it takes 2 parameters
//the first parameter is the port we want this application to listen on
//5000 will be the port the server will be running on in our system
//second parameter is optional it is a callback function of what should happen when the server is created,
//in this case the callback will show a console log so the user can verify ther server was created
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});