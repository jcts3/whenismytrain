const deptInfoController = require("./departureInfoController");

const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');

const rtt = require('./index');
const info = require('./info.json');

const port = 8081;
const app = express();
const serviceRouter = express.Router();

serviceRouter.get('/:dept/:dest/departureinfo', deptInfoController.getDepartureInfo);



serviceRouter.get('/:dept/:dest/', (req, res, next) => {
  const prefStation = req.params.dept;
  const destStation = req.params.dest;
  rtt.routeInfo.getRouteNextService(prefStation, destStation, (service) => {
    rtt.serviceInfo.getServiceAll(service, (serviceInfo) => {
      res.json(serviceInfo);
    });
  });
});


app.use(serviceRouter);

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
