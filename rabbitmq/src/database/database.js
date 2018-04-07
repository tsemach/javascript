
require('dotenv').config();
const Sequelize = require('sequelize');

console.log("%s, %s, %s %s", process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, process.env.DB_DIALECT);
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: process.env.DB_DIALECT,
});

const Session = sequelize.import('../../models/session');

let session = Session.build({name: "tsemach", task: "{}", task_md5: "805053ace1ec44e3c6bf5a72d7e5d644", event: "{}", event_md5: "805053ace1ec44e3c6bf5a72d7e5d644"})

session.save()
    .then(() => console.log("session wrote to db ok"))
    .catch(what => console.log("ooops .. something bad happend - " + what));



