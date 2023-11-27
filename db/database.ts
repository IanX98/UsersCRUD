const { Client } = require('pg');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('user_pgdb', 'postgres', 'simpsons1', {
    dialect: 'postgres',
    host: 'db'
});

module.exports = sequelize;
