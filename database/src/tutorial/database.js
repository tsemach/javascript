
const Sequelize = require('sequelize');

// connect to the database
const sequelize = new Sequelize('loopback', 'postgres', 'postgres', {
    dialect: 'postgres',
});

const User = sequelize.import('../../models/user');
const Session = sequelize.import('../../models/session');

let user = User.build({name: "tsemach", age: 56})
let session = Session.build({name: "tsemach", task: "{}", task_md5: "705053ace1ec44e3c6bf5a72d7e5d644", event: "{}", event_md5: "705053ace1ec44e3c6bf5a72d7e5d644"})

user.save()
    .then(() => console.log("user tsemach:56 wrote to db"))
    .catch(what => console.log("ooops .. something bad happend - " + what));

session.save()
    .then(() => console.log("session wrote to db ok"))
    .catch(what => console.log("ooops .. something bad happend - " + what));



