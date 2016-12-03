var Sequelize= require('sequelize');
var pg= require('pg');

//const connectionString = process.env.DATABASE_URL;
const connectionString ='postgres://dbSW:password@localhost:5432/dbSW';
var Conn = new Sequelize(connectionString);

Conn
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
});