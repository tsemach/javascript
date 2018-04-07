//const Sequelize = require('sequelize');
const application = require('./application');

// const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
//     dialect: process.env.DB_DIALECT,
// });
//
// const AppTable = sequelize.import('../../models/application');
//
// let appTable= AppTable.build({
//     mode: 'PLAYER',
// });
//
// appTable.save()
//     .then(function() {
//         console.log("application: application wrote to db ok");
//     })
//     .catch(what => console.log("application: Ooops! .. something bad happen - %s", what));

application.load();