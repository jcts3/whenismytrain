const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');

const rtt = require('./index');
const info = require('./info.json');

const port = 8081;
const app = express();
const serviceRouter = express.Router();

serviceRouter.get('/:dept/:dest/departureinfo', (req, res, next) => {
  const origStation = req.params.dept;
  const destStation = req.params.dest;
  rtt.routeInfo.getRouteNextService(origStation, destStation, (service) => {
    rtt.serviceInfo.getServiceAll(service, (serviceInfo) => {
      // res.json(serviceInfo);
      const resp = {};
      resp.trainArrivesAtDept = (serviceInfo.locations).prototype.filter(element => element.crs === origStation);
      res.json(resp);
    });
  });
});

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


// key details: 
//     DEPT TIMES: departure time, arrival time (dept stat), delay?, delay length,
//     ARRIV TIMES: arrival time (dest stat), delay?, delay length
//     ROUTE INFO: dept platform #, origin, final destination, dest platfrom #