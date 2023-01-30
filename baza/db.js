const Sequelize = require('sequelize');

const sequelize = new Sequelize("wt2018","root","root",{host:"localhost",dialect:"mysql",logging:false});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

db.student = sequelize.import(__dirname+'/student.js');
db.godina = sequelize.import(__dirname+'/godina.js');
db.zadatak = sequelize.import(__dirname+'/zadatak.js');
db.vjezba = sequelize.import(__dirname+'/vjezba.js');

//1-n godina-student
db.godina.hasMany(db.student, {foreignKey: "studentGod", as: "studenti"});
//n-m godina-vjezba
db.godina.belongsToMany(db.vjezba, {through: "godina_vjezba", foreignKey: "idgodina", as: "vjezbe"});
db.vjezba.belongsToMany(db.godina, {through: "godina_vjezba", foreignKey: "idvjezba", as: "godine"});
// n-m vjezba-zadatak
db.vjezba.belongsToMany(db.zadatak, {through: "vjezba_zadatak", foreignKey: "idvjezba", as:"zadaci"});
db.zadatak.belongsToMany(db.vjezba, {through: "vjezba_zadatak", foreignKey: "idzadatak", as:"vjezbe"});

module.exports = db;
