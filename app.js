import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index.js';

//setup the express app, boot the server via babel-node for es5 by running $ node_modules/.bin/babel-node app.js 
//$ node app.js
const app = express();

// parse incoming requests data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

//you will access the server at localhost:5000/api/v1/todos
const PORT = 5000;

// //app listen creates a web server for us, it takes 2 parameters
// //the first parameter is the port we want this application to listen on
// //5000 will be the port the server will be running on in our system
// //second parameter is optional it is a callback function of what should happen when the server is created,
// //in this case the callback will show a console log so the user can verify ther server was created
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
