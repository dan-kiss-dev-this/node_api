import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';

//setup the express app, boot the server via babel-node for es5 by running $ node_modules/.bin/babel-node app.js 
//$ node app.js
const app = express();

// parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

//make a post endpoint to create a todo
app.post('/api/v1/todos', (req, res) => {
    if(!req.body.title) {
        return res.status(400).send({
            success: 'false',
            message: 'title is required',
        });
    }
    else if(!req.body.description) {
        return res.status(400).send({
            success: 'false',
            message: 'description is required',
        });
    }
    const todo = {
        id: db.length+1,
        title: req.body.title,
        description: req.body.description,
    }
    db.push(todo);
    return res.status(201).send({
        success: 'true',
        message: 'todo added successfully',
        todo,
    });
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

//now we will create an endpoint to get a single todo from the database
//note :id is the endpoint in the route, its a variable parameter we get with req.params.id
app.get('/api/v1/todos/:id', (req,res) => {
    const id = parseInt(req.params.id, 10);
    //the db coming from hard coded value
    db.map( (todo) => {
        if (todo.id === id) {
            return res.status(200).send({
                success: 'true',
                message: 'todo retrieved successfully',
                todo,
            });
        } 
    });
    return res.status(404).send({
        success: 'false',
        message: 'todo does not exist',
    });
});

//add api endpoint to delete todos from the database note use of splice
app.delete('/api/v1/todos/:id', (req,res) => {
    const id = parseInt(req.params.id, 10);
    db.map((todo, index) => {
        if (todo.id === id) {
            db.splice(index,1);
            return res.status(200).send({
                success: 'true',
                message: 'todo delete successfully'
            });
        }

        return res.status(404).send({
            success: 'false',
            message: 'todo not found',
        });
    });
});

//add api to update a todo
app.put('/api/v1/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let todoFound;
    let itemIndex;
    db.map( (todo,index) => {
        if (todo.id === id) {
            todoFound = todo;
            itemIndex = index;
        }
    });

    if(!todoFound) {
        return res.status(404).send({
            success: 'false',
            message: 'todo not found',
        })
    }

    if(!req.body.title){
        return res.status(404).send({
            success: 'false',
            message: 'title is required',
        });
    } else if(!req.body.description){
        return res.status(404).send({
            success: 'false',
            message: 'description is required',
        });
    }

    const updatedTodo = {
        id: todoFound.id,
        title: req.body.title || todoFound.title,
        description: req.body.description || todoFound.description
    };

    db.splice(itemIndex,1,updatedTodo);

    return res.status(201).send({
        success: 'true',
        message: 'todo added successfully',
        updatedTodo,
    });
});