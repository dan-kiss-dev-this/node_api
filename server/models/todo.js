'use strict';
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,
    allowNull: false,
  }, {});
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.hasMany(models.TodoItem, {
      foreignKey: 'todoId',
    });
  };
  return Todo;
};

//we modified todo.js to add the extra attribute allowNull: false
//this attribute makes the title field not nullable so error is thrown if we try to add an empty or null value
//Datatypes.string means we only expect a string value in the field

//Also we created a relationship between Todo and TodoItem as every single Todo has a todoItem
//that relationship is defined with the hasMany method of the Todo Model.
//The foreignKey:'todoID' means that todoId is going to be the foreign key column in todoItem. You can read more about foreign keys here.