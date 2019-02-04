# To get the project up and running run the commands below.

Install Homebrew if you don't have it with $ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

Install Postgres if you don't have it with $ brew install postgresql

In the project root add a .env file and in that file write DATABASE_URL=postgres://username:password@localhost:5432/database_name your env file may look like the text below assuming no password is used.

DATABASE_URL=postgres://macbook@localhost:5432/todoapp

"development": {
    "use_env_variable": "DATABASE_URL"
},

$ createdb todoapp

$ npm install

$ export DATABASE_URL=postgres://macbook@localhost:5432/todoapp

$ node_modules/.bin/sequelize db:migrate

$ npm run start

Now you have a RESTful API written in node.js. The APIs in this project offer functionality to Create, Read, Update and Destroy data for a specific table. The data is persistent. 

Get and Post at http://localhost:5000/api/v1/todos see post occuring below
Put at http://localhost:5000/api/v1/todos/1
Delete at http://localhost:5000/api/v1/todos/1

![Post](/img/post.png?raw=true "post")

See the comments in the code to understand the code also.

Note: We are creating an endpoint to add todos, package body-parser parses aka converts incoming request bodies in a middleware before your handlers, availible under the req.body.property
so if you have a json data coming from the client to the server
{
	"id": 1,
    "title": "Lunch at 1",
    "createdAt": "2019-02-02T01:11:07.311Z",
    "updatedAt": "2019-02-02T01:43:24.495Z"
}
after the req middlewhere runs you can do req.body.title aka make the json info a js object! 

MIT License Author: Dan Kiss Feb 3 2019