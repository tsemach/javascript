import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";

import web_server from "./web_server";
import management from "./management";

import amqp from "./rabbitmq";

class Application {

  public express: express.Application;

  // run configuration methods on the express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // configure express middleware.
  private middleware(): void {
    //this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.express.use("/web_srv", web_server.add())
    this.express.use("/web_api", management.add());
  }
}

let application = new Application();

const port: number = 3000;

amqp.connect('hello');
//amqp.receive();

application.express.listen(port, () => {
    // success callback

    console.log(`Listening at http://localhost:${port}/`);
});
