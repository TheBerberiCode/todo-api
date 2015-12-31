var express = require('express');
var app = express();
var _ = require('underscore');
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json);

app.get('/', function(req,res){
	res.send('Todo API Root');
});

app.get('/todos', function(req,res){
	 res.json(todos);
});

app.get('/todos/:id', function(req,res){
	 var todoId = parseInt(req.params.id,10);
	 var matchedTodo = _.findWhere(todos,{id: todoId});

	 if(matchedTodo){
	 	res.json(matchedTodo);
	 }else{
	 	res.status(404).send();
	 }
});

app.post('/todos',function(req,res){
	_.pick(body, 'id','completed','description');
	var body = _.pick(req.body,'completed','description');

	if(!_.isBoolean(body.completed) || !_.isString(body.descripton) || body.description.trim().length === 0) {
		return res.status(400).send();
	}
	
	body.description = body.description.trim();
	body.id = todoNextId;
	todos.push(body);
	todoNextId++;	


	console.log('descriptop:' + body.descripton);
	res.json(body);
});

app.listen(PORT, function(){
	console.log('Express  is listening on port' + PORT);
});