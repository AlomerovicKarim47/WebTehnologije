const Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){
    const Student = sequelize.define('student', {
        imePrezime: {
            type: Sequelize.STRING
        },
        index: {
            type: Sequelize.STRING,
            unique: true
        }
    });
    return Student;
}