import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

export class Management {

    constructor() {
    }
  
    public add(): express.Router {
      // route: more --------------------------------------------------------------
       let mgmt = express.Router();
      
      mgmt.get('/', (req, res, next) => {
        console.log("got request");
          res.json({
            message: 'Hello tsemach /management!'
          });
      });
    
      mgmt.get('/tsemach', (req, res, next) => {
        console.log("got request");
        res.json({
          message: 'Hello tsemach, tsemach/management!'
        });
      });
  
      mgmt.post('/post', function (req, res) {
        console.log('got call from client post ' + req)        
        let requestAsJson = JSON.stringify(req.body);

        console.log('monitor: POST data received was: ' + requestAsJson);              
            
        // set the appropriate HTTP header
        res.setHeader('Content-Type', 'application/json');
           
        res.json({
          type: 'command',
          session: "1234-abcd",
          command: "sic",
          arguments: {
            ip: "192.168.0.1",
            secret : "aaaa"
          }
        });      
      })
      
      return mgmt;
   // --------------------------------------------------------------------------
    }
}

export default new Management();