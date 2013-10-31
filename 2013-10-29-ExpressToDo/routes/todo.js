var database = require('../modules/database.js');
/*
 * GET /todo page.
 */

exports.index = function(req, res){
  var todos = database.read(__dirname + '/../db/todos.json');
  res.render('todo/index', { title: 'Task List', todos: todos });

};


/*
 * GET /todo/new
 */

exports.new = function(req, res){
  res.render('people/new', { title: 'Task List: New To Do' });
};

/*
 * POST /todo
 */

exports.create = function(req, res){
  var item = req.body.item;
  var due = req.body.due;
  var color = req.body.color;

  var todos = database.read(__dirname + '/../db/todos.json');
  var todo = {item: item, due: due, color: color};
  todos.push(todo);
  database.write(__dirname + '/../db/todos.json', todos)

  res.redirect('/todo');
};
