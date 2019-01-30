'use strict';
module.exports = (sequelize, DataTypes) => {
  const TodoItem = sequelize.define('TodoItem', {
    description: DataTypes.STRING,
    allowNull: false,
  }, {});
  TodoItem.associate = function(models) {
    // associations can be defined here
    TodoItem.belongsTo(models.Todo, {
      foreignKey: 'todoId',
      onDelete: 'CASCADE',
    })
  };
  return TodoItem;
};

//every single todo has many todoitems and each todoitem belongs to one todo
//this is why we have the TodoItem.belongsTo defined in our model above.
//the onDelete:'CASCADE' means if we delete a todo then the associated todoItem should also be deleted
//