const rtt = require('./index');

async function departureInfoFromService(serviceInfo, service, deptStation, destStation) {
  const {
    locations
  } = serviceInfo;
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
  return resp;
};

exports.getDepartureInfo = (req, res, next) => {
  const deptStation = req.params.dept;
  const destStation = req.params.dest;
  rtt.routeInfo.getRouteNextService(deptStation, destStation, (service) => {
    rtt.serviceInfo.getServiceAll(service, async (serviceInfo) => {
      // res.json(serviceInfo);
      const resp = await departureInfoFromService(serviceInfo, service, deptStation, destStation);
      res.json(resp);
    });
  });
};
