const rtt = require('./index');

async function getOriginStationInfo(locations, deptStation, response) {
  const locInfoArr = await locations.filter(element => element.crs === deptStation);
  const locInfo = locInfoArr[0];
  const resp = response;
  if (locInfo.displayAs === 'ORIGIN') {
    // future work - check if there's existing train coming into same platform here!
    resp.arrivalTime = 'n/a - Origin Station';
  } else {
    resp.arrivalTime = {
      timetableArrivalTime: locInfo.gbttBookedArrival,
      actualArrivalTime: locInfo.realtimeArrival,
    };
  }
  resp.departTime = {
    timetableDepartureTime: locInfo.gbttBookedDeparture,
    actualDepartureTime: locInfo.realtimeDeparture,
  };
  resp.platform = {
    platformNumber: locInfo.platform,
    'platformConfirmed?': locInfo.platformConfirmed,
  };
  return resp;
}

async function departureInfoFromService(serviceInfo, service, deptStation, destStation) {
  const { locations } = serviceInfo;
  let resp = {
    requestType: 'when is my next train',
    serviceID: service.serviceUid,
    yourRequestInfo: {
      departureStation: deptStation,
      destinationStation: destStation,
    },
    dateOfTrain: serviceInfo.runDate,
    trainRouteInfo: {
      originStation: serviceInfo.origin[0].description,
      finalStation: serviceInfo.destination[0].description,
    },
  };
  resp = await getOriginStationInfo(locations, deptStation, resp);
  return resp;
}

exports.getDepartureInfo = (req, res, next) => {
  const deptStation = req.params.dept;
  const destStation = req.params.dest;
  rtt.routeInfo.getRouteNextService(deptStation, destStation, (service) => {
    rtt.serviceInfo.getServiceAll(service, async (serviceInfo) => {
      // res.json(serviceInfo);
      const resp = await departureInfoFromService(serviceInfo, service, deptStation, destStation);
      res.status(202);
      res.json(resp);
    });
  });
};

exports.getDepartureInfoFromService = (req, res, next) => {
  const service = {
    serviceUid: req.params.serviceID,
  };
  const deptStation = req.params.dept;
  const destStation = req.params.dest;
  rtt.serviceInfo.getServiceAll(service, async (serviceInfo) => {
    const resp = await departureInfoFromService(serviceInfo, service, deptStation, destStation);
    res.status(200);
    res.json(resp);
  });
};
