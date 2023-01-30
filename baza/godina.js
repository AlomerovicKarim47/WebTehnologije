const Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){
    const Godina = sequelize.define('godina', {
        naziv: {
            type: Sequelize.STRING,
            unique: true
        },
        nazivRepSpi: {
            type: Sequelize.STRING
        },
        nazivRepVje: {
            type: Sequelize.STRING
        }
    });
    return Godina;
}