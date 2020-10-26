import * as express from 'express'
import {Routes} from "./Routes";
import bodyParser = require("body-parser");
class App {

    public app: express.Application;
    public routePrv: Routes;

    constructor() {
        this.app = express();

            this.app.use(bodyParser.json());

            //support application/x-www-form-urlencoded post data
            this.app.use(bodyParser.urlencoded({ extended: false }));
    
            this.routePrv = new Routes();
            this.routePrv.routes(this.app);
        }
       // support application/json type post data
        

}

export default new App().app;