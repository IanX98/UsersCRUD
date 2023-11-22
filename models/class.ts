const Sequelize = require('sequelize');

const sequelize = require('../db/database');

const Class = sequelize.define('class', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNUll: false,
        primaryKey: true
    },
    name: { 
        type: Sequelize.STRING,
        allowNUll: false
    },
    year: {
        type: Sequelize.INTEGER,
        allowNUll: false
    },
    institution: {
        type: Sequelize.STRING,
        allowNUll: false
    },
});

module.exports = Class;
