var express = require('express');
var app = express();
var _ = require('underscore');
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;
var todoNextId = 1;
var todos = [];

app.use(bodyParser.json());

app.get('/', function(req,res){
	res.send('Testing!');
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
	var body = _.pick(req.body,'completed','description');

	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send();
	}
	
	body.description = body.description.trim();
	body.id = todoNextId;
	todos.push(body);
	todoNextId++;	


	console.log('description:' + body.description);
	res.json(body);
});

// DELETE /todos/:id

app.delete('/todos/:id', function(req,res){
	 var idToDelete = parseInt(req.params.id,10);
	 var matchedTodo = _.findWhere(todos,{id: idToDelete});

	 if(!matchedTodo){
	 	res.status(404).json({"error": "no todo found with that id"});
	 }else{
	 	todos = _.without(todos,matchedTodo);
	 	res.json(matchedTodo);
	 }
});

//PUT /todos/:id

app.put('todos/:id', function(req,res) {
	var todoID = parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(todos,{id: todoID});
	var body = _.pick(req.body,'completed','description');
	var validAttributes = {};

	if(!matchedTodo) {
		console.log("Todo doesnt exist");
		return res.status(404).send();
	}

	if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
		validAttributes.completed = body.completed;
	}else if( body.hasOwnProperty('completed')) {
		return res.status(400).send();
	}

	if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
		validAttributes.description= body.description;
	}else if( body.hasOwnProprty('description')) {
		return res.status(400).send();
	}

		//updating matched todo via extend method
	 _.extend(matchedTodo, validAttributes);
	 res.json(matchedTodo);
});

app.listen(PORT, function(){
	console.log('Express  is listening on port' + PORT);
});