var express = require('express');
var app = express();
var _ = require('underscore');
var bodyParser = require('body-parser');
var db = require('./db.js');
var PORT = process.env.PORT || 3000;


var todos = [{
	'complete': true
}];

var todoNextId = 1;
var todos = [];

app.use(bodyParser.json());


app.get('/', function(req, res) {
	res.send('Testing!');
});

app.get('/todos', function(req, res) {
	var query = req.query;
	var where = {};

	if (query.hasOwnProperty('completed') && query.completed === 'true') {
		where.completed = true;
	} else if (query.hasOwnProperty('completed') && query.completed === 'false') {
		where.completed = false;
	}

	if (query.hasOwnProperty('q') && query.q.length > 0) {
		where.description = {
			$like: '%' + query.q + '%'
		};
	}

	db.todo.findAll({
		where: where
	}).then(function(todos) {
		res.json(todos);
	}, function(e) {
		res.status(500).send();
	});

});

app.get('/todos/:id', function(req, res) {
	var todoID = parseInt(req.params.id, 10);

	db.todo.findById(todoID).then(function(todo) {
		if (!!todo) {
			res.json(todo.toJSON());
		} else {
			res.status(404).send();
		}
	}, function(e) {
		res.status(500).send();
	});
});

app.post('/todos', function(req, res) {
	var body = _.pick(req.body, 'completed', 'description');

	db.todo.create(body).then(function(todo) {
		res.json(todo.toJSON());
	}, function(e) {
		res.status(400).json(e);
	});
});

// DELETE /todos/:id

app.delete('/todos/:id', function(req, res) {
	var idToDelete = parseInt(req.params.id, 10);

	db.todo.destroy({
		where: {
			id: idToDelete
		}
	}).then(function(rowsDeleted) {
		if (rowsDeleted === 0) {
			res.status(404).json({
				error: 'No todo with id'
			});
		} else {
			res.status(204).send();
		}
	}, function() {
		res.status(500).send();
	});
});

//PUT /todos/:id

app.put('/todos/:id', function(req, res) {
	var todoID = parseInt(req.params.id, 10);
	var body = _.pick(req.body, 'completed', 'description');
	var attributes = {};

	if (body.hasOwnProperty('completed')) {
		attributes.completed = body.completed;
	}

	if (body.hasOwnProperty('description')) {
		attributes.description = body.description;
	}

	db.todo.findById(todoID).then(function(todo) {
		if (todo) {
			todo.update(attributes).then(function(todo) {
				res.json(todo.toJSON());
			}, function(e) {
				res.status(400).json(e);
			});
		} else {
			res.status(404).send();
		}
	}, function() {
		res.status(500).send();
	});
});


db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log('Express  is listening on port' + PORT);
	});
});