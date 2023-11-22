const Sequelize = require('sequelize');

const sequelize = require('../db/database');
const Class = require('../models/class');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNUll: false,
        primaryKey: true
    },
    firstName: { 
        type: Sequelize.STRING,
        allowNUll: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNUll: false
    },
    age: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING,
        allowNUll: false
    },
});

User.belongsTo(Class);


module.exports = User;
