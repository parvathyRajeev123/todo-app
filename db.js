const Sequelize = require('sequelize');
const config = require('./config.js');

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  }
);

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

  // Define a model for the existing table
const todo = sequelize.define('todo', {
    // Define the attributes/columns of the table here
    // For example:
    id: {
       
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    data: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
  }, {
    tableName: 'todo',
    timestamps: false
  }
  
  );
  
//   // View the table data
//   todo.findAll()
//     .then((rows) => {
//       console.log(rows);
//     })
//     .catch((err) => {
//       console.error('Error querying the table:', err);
//     })
//     .finally(() => {
//       // Close the database connection
//       sequelize.close();
//     });

//Create Data to the table Todo
async function createTodo(data_, status_){
    try {
        const todos = await todo.create({ 
            data: data_,
            status: status_
        })
    } catch (error) {
        console.log('error',error);
    }
}

//To get all Data from Todo
async function getAllTodoList() {
  const getTodos = await todo.findAll();
  return getTodos;
  //console.log(">>>>>>",getTodos)
}

//Update Data to table using Id
async function updateTodoList(_uId, uData, uStatus){
  const updateTodos = await todo.update({
    data: uData, 
    status: uStatus},{
      where: {
        id: _uId
      }
    })
    return updateTodos;
}

//Delete Data in table
async function deleteTodolist(dId){
  const deleteTodos = await todo.destroy({
    where:{
      id: dId
    }
  })
  return deleteTodos;
}
module.exports = {getAllTodoList, createTodo, updateTodoList, deleteTodolist};  
//module.exports = deleteTodolist();
//module.exports = sequelize;