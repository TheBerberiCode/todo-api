var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined,undefined,undefined, {
	'dialect': 'sqlite',
	'storage':__dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

sequelize.sync().then( function(){
	console.log('Everything is synced');

	//finds a todo with a certain id
	Todo.findById(1).then(function(todo){
		if(todo){
			console.log(todo.toJSON());
		}else{
			console.log('Could not find Todo');
		}
	});


	//creates a dummy todo
	Todo.create({
		description: 'take out trash'
	}).then(function(todo){
		console.log('Finished');
		console.log(todo);
	}).catch(function(e){
		console.log(e);
	});
});