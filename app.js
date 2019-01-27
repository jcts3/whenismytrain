const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');

const rtt = require('./index');
const info = require('./info.json');

const port = 8081;
const app = express();
const serviceRouter = express.Router();

serviceRouter.get('/:dept/:dest/departureinfo', (req, res, next) => {
  const deptStation = req.params.dept;
  const destStation = req.params.dest;
  rtt.routeInfo.getRouteNextService(deptStation, destStation, (service) => {
    rtt.serviceInfo.getServiceAll(service, async (serviceInfo) => {
      // res.json(serviceInfo);
      const { locations } = serviceInfo;
      const resp = {
        requestType: 'when is my next train',
        serviceID: service.serviceUid,
        yourRequestInfo: {
          departureStation: deptStation,
          destinationStation: destStation,
        },
        trainRouteInfo: {
          originStation: serviceInfo.origin[0].description,
          finalStation: serviceInfo.destination[0].description,
        },
      };
      const locInfoArr = await locations.filter(element => element.crs === deptStation);
      const locInfo = locInfoArr[0];
      if (locInfo.displayAs === 'ORIGIN') {
        // future work - check if there's existing train coming into same platform here!
        resp.arrivalTime = 'n/a - Origin Station';
      } else {
        resp.arrivalTime = {
          expectedArrivalTime: locInfo.gbttBookedArrival,
          actualArrivalTime: locInfo.realtimeArrival,
        };
      }
      resp.departTime = {
        expectedDepartureTime: locInfo.gbttBookedDeparture,
        actualDepartureTime: locInfo.realtimeDeparture,
      };
      resp.platform = {
        platformNumber: locInfo.platform,
        'platformConfirmed?': locInfo.platformConfirmed,
      };
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
//     ROUTE INFO: dept platform #, origin, final destination, dest platfrom
