const Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){
    const Zadatak = sequelize.define('zadatak', {
        naziv: {
            type: Sequelize.STRING
        },
        postavka: {
            type: Sequelize.STRING
        }
    });
    return Zadatak;
}