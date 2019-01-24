To get the project up and running run the 2 commands below.

$ npm install

$ npm run start

this is a node server. See the comments in the code to understand the code also.

we are creating an endpoint to add todos but before we install a package, $npm install body-parser, the body parser parses aka converts incoming request bodies in a middleware before your handlers, availible under the req.bodyproperty
so if you have a json data coming from the client to the server
{
	“name”: “olga”,
	“school”: “uniserty”
}

after the req middlewhere runs you can do req.body.name aka make the json info a js object! 

Get and Post at http://localhost:5000/api/v1/todos see post occuring below

![Post](/img/post.png?raw=true "post")

