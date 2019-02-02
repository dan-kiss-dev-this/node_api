//inside todos.js we are going to create a class, this class will hold all our callback functions as its methods
//whenever we need to make use of any of the methods we will create an instance of the class and get the method we need

/* eslint-disable class-methods-use-this */
// import db from '../db/db';
// we import models with the statement below, this will go to models/index.js and import db this allows interacting with the database
import models from '../server/models';

//I'm making a class here, this will allow me to make an instance of the controller and have cleaner code invoked
class TodosController {
    getAllTodos(req, res) {
        models.Todo.findAll()
        .then((todos) => res.status(200).send({
            success: 'true',
            message: 'todos retrieved successfully',
            todos,
        }));
    }

    getTodo(req, res) {
        const id = parseInt(req.params.id, 10);
        models.Todo.findById(id).then(
            todo => {
                if (todo) {
                    return res.status(200).send({
                        success: 'true',
                        message: 'todo retrieved successfully',
                        todo,
                    });
                }
                return res.status(404).send({
                    success: 'false',
                    message: 'todo does not exist',
                });
            }
        );
    }

    //this is the new use with postgres createTodo
    createTodo(req, res) {
        if (!req.body.title) {
            return res.status(400).send({
                success: 'false',
                message: 'title is required',
            });
        }
        models.Todo.findOne({
            where: { title: req.body.title }
        })
        .then((todoFound) => {
            if (todoFound) {
                return res.status(403).send({
                    success: 'false',
                    message: 'A todo with that title exists already',
                });
            }
            const todo = {
                title: req.body.title,
            };
            //note the .then()runs when the todo has been successfully added to the database
            models.Todo.create(todo).then((todo) => {
                return res.status(201).send({
                    success: 'true',
                    message: 'todo added successfully',
                    todo,
                });
            });
        })
    }

    updateTodo(req, res) {
        const id = parseInt(req.params.id, 10);
        let todoFound;
        let itemIndex;
        db.map( (todo, index) => {
            if (todo.id === id) {
                todoFound = todo;
                itemIndex = index;
            }
        });

        if (!todoFound) {
            return res.status(404).send({
                success: 'false',
                message: 'todo not found',
            });
        }

        if (!req.body.title) {
            return res.status(400).send({
                success: 'false',
                message: 'title is required'
            });
        } else if (!req.body.description) {
            return res.status(400).send({
                success: false,
                message: 'description is required',
            });
        }

        const newTodo = {
            id: todoFound.id,
            title: req.boby.title || todoFound.title,
            description: req.body.description || todoFound.description,
        }

        db.splice(itemIndex,1,newTodo);

        return res.status(201).send({
            success: 'true',
            message: 'todo added successfully',
            newTodo,
        });
    }

    deleteTodo(req, res) {
        const id = parseInt(req.params.id, 10);
        let todoFound;
        let itemIndex;
        db.map((todo, index) => {
            if (todo.id === id) {
                todoFound = todo;
                itemIndex = index;
            }
        });

        if (!todoFound) {
            return res.status(404).send({
                success: 'false',
                message: 'todo not found',
            });
        }
        db.splice(itemIndex, 1);

        return res.status(200).send({
            success: 'true',
            message: 'Todo deleted successfully',
        });
    }
}

//to create an instance of the class
const todoController = new TodosController();
export default todoController;

//-------------Original Notes below-----------------

// //get all todos, note api endpoint provided as first parameter, 
// //second parameter is function that runs everytime we hit the endpoint
// //this function takes 2 parameters, which are req and res, the req object contains info about request,
// //the res object contains information about the response and methods we can use to send information back to the client
// //we chain methods here first .status(200) means a successful req/request occured 
// //then .send({object,}) is used to send back a response to the client
// //the resource (db) into the send as a parameter is what gets back to the client, here we have a object, 
// //the todos property of the object contains the data we imported
// app.get('/api/v1/todos', (req,res) => {
//     res.status(200).send({
//         success: 'true',
//         message: 'todos retrieved successfully',
//         todos: db,
//     })
// });

// //make a post endpoint to create a todo
// app.post('/api/v1/todos', (req, res) => {
//     if(!req.body.title) {
//         return res.status(400).send({
//             success: 'false',
//             message: 'title is required',
//         });
//     }
//     else if(!req.body.description) {
//         return res.status(400).send({
//             success: 'false',
//             message: 'description is required',
//         });
//     }
//     const todo = {
//         id: db.length+1,
//         title: req.body.title,
//         description: req.body.description,
//     }
//     db.push(todo);
//     return res.status(201).send({
//         success: 'true',
//         message: 'todo added successfully',
//         todo,
//     });
// });

// //now we will create an endpoint to get a single todo from the database
// //note :id is the endpoint in the route, its a variable parameter we get with req.params.id
// app.get('/api/v1/todos/:id', (req,res) => {
//     const id = parseInt(req.params.id, 10);
//     //the db coming from hard coded value
//     db.map( (todo) => {
//         if (todo.id === id) {
//             return res.status(200).send({
//                 success: 'true',
//                 message: 'todo retrieved successfully',
//                 todo,
//             });
//         } 
//     });
//     return res.status(404).send({
//         success: 'false',
//         message: 'todo does not exist',
//     });
// });

// //add api endpoint to delete todos from the database note use of splice
// app.delete('/api/v1/todos/:id', (req,res) => {
//     const id = parseInt(req.params.id, 10);
//     db.map((todo, index) => {
//         if (todo.id === id) {
//             db.splice(index,1);
//             return res.status(200).send({
//                 success: 'true',
//                 message: 'todo delete successfully'
//             });
//         }

//         return res.status(404).send({
//             success: 'false',
//             message: 'todo not found',
//         });
//     });
// });

// //add api to update a todo
// app.put('/api/v1/todos/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     let todoFound;
//     let itemIndex;
//     db.map( (todo,index) => {
//         if (todo.id === id) {
//             todoFound = todo;
//             itemIndex = index;
//         }
//     });

//     if(!todoFound) {
//         return res.status(404).send({
//             success: 'false',
//             message: 'todo not found',
//         })
//     }

//     if(!req.body.title){
//         return res.status(404).send({
//             success: 'false',
//             message: 'title is required',
//         });
//     } else if(!req.body.description){
//         return res.status(404).send({
//             success: 'false',
//             message: 'description is required',
//         });
//     }

//     const updatedTodo = {
//         id: todoFound.id,
//         title: req.body.title || todoFound.title,
//         description: req.body.description || todoFound.description
//     };

//     db.splice(itemIndex,1,updatedTodo);

//     return res.status(201).send({
//         success: 'true',
//         message: 'todo added successfully',
//         updatedTodo,
//     });
// });