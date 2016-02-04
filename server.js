var express = require('express');
var app = express();
var _ = require('underscore');
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;
<<<<<<< Updated upstream
=======
var todos = [{
	'complete': true
}];
>>>>>>> Stashed changes
var todoNextId = 1;
var todos = [];

app.use(bodyParser.json());

<<<<<<< Updated upstream
app.get('/', function(req,res){
	res.send('Testing!');
=======
app.get('/', function(req, res) {
	res.send('Todo API Root');
>>>>>>> Stashed changes
});

app.get('/todos', function(req, res) {
	res.json(todos);
});

app.get('/todos/:id', function(req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {
		id: todoId
	});

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}
});

app.post('/todos', function(req, res) {
	var body = _.pick(req.body, 'completed', 'description');

<<<<<<< Updated upstream
	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
=======
	if (!_.isBoolean(body.completed) || !_.isString(body.descripton) || body.description.trim().length === 0) {
>>>>>>> Stashed changes
		return res.status(400).send();
	}

	body.description = body.description.trim();
	body.id = todoNextId;
	todos.push(body);
	todoNextId++;


	console.log('descriptop:' + body.description);
	res.json(body);
});

<<<<<<< Updated upstream
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

app.listen(PORT, function(){
=======
app.listen(PORT, function() {
>>>>>>> Stashed changes
	console.log('Express  is listening on port' + PORT);
});