const player = require('../player/player');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: process.env.DB_DIALECT,
});

const AppTable = sequelize.import('../../models/application');

class Application {
    constructor() {
        let setMode = function(mode) {
            this.mode = mode;
            console.log("after load: mode - " + this.mode);
        };
        this.load().then(setMode.bind(this));
    }

    load() {
        return new Promise(function(resolve, reject) {
            AppTable.findOne({
                attributes: ['mode']
            }).then(function(application) {
                resolve(application.mode);
            }).catch(what => console.log("Application:load: Ooops! .. something bad happen - %s", what));
        });
    }

    run() {

    }
}

module.exports = new Application();