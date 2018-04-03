import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

export class WebServer {

    constructor() {
    }

    public add(): express.Router {
        // route: more --------------------------------------------------------------
        const server = express.Router();

        server.get('/', (req, res, next) => {
            console.log("got request");
            res.json({
                message: 'Hello tsemach /web_api!'
            });
        });

        server.get('/tsemach', (req, res, next) => {
            console.log("got request");
                res.json({
                message: 'Hello tsemach, /web_api/tsemach!'
            });
        });

        server.post('/', function (req, res) {
            console.log('got call from client post ' + req);
            let requestAsJson = JSON.stringify(req.body);

            console.log('monitor: POST data received was: ' + requestAsJson);
            
            // set the appropriate HTTP header
            res.setHeader('Content-Type', 'application/json');
           
            res.json({
                subject: 'command',
                session: "1234-abcd",
                command: "reset",
                arguments: {
                    ip: "192.168.0.1",
                    secret : "someone"
                }
            });
        })

        return server;
        // --------------------------------------------------------------------------
    }
}

export default new WebServer();