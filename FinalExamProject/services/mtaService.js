const axios = require('axios');
const GtfsRealtimeBindings = require('gtfs-realtime-bindings');

const BASE_URL = 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/';

const LIRR_ROUTE_NAMES = {
  '1':  'Babylon',
  '2':  'City Terminal Zone',
  '3':  'Far Rockaway',
  '4':  'Long Beach',
  '5':  'Hempstead',
  '6':  'West Hempstead',
  '7':  'Oyster Bay',
  '8':  'Port Jefferson',
  '9':  'Ronkonkoma',
  '10': 'Montauk',
  '11': 'Port Washington',
  '12': 'Special Service',
  '13': 'Special Service',
};

// Maps the first character of a subway stopId to the correct GTFS-RT feed path
const SUBWAY_PREFIX_TO_FEED = {
  '1': 'nyct%2Fgtfs', '2': 'nyct%2Fgtfs', '3': 'nyct%2Fgtfs',
  '4': 'nyct%2Fgtfs', '5': 'nyct%2Fgtfs', '6': 'nyct%2Fgtfs',
  'S': 'nyct%2Fgtfs',
  'A': 'nyct%2Fgtfs-ace', 'C': 'nyct%2Fgtfs-ace', 'E': 'nyct%2Fgtfs-ace',
  'B': 'nyct%2Fgtfs-bdfm', 'D': 'nyct%2Fgtfs-bdfm',
  'F': 'nyct%2Fgtfs-bdfm', 'M': 'nyct%2Fgtfs-bdfm',
  'G': 'nyct%2Fgtfs-g',
  'J': 'nyct%2Fgtfs-jz', 'Z': 'nyct%2Fgtfs-jz',
  'N': 'nyct%2Fgtfs-nqrw', 'Q': 'nyct%2Fgtfs-nqrw',
  'R': 'nyct%2Fgtfs-nqrw', 'W': 'nyct%2Fgtfs-nqrw',
  'L': 'nyct%2Fgtfs-l',
  '7': 'nyct%2Fgtfs',
};

async function fetchFeed(feedPath) {
  const url = `${BASE_URL}${feedPath}`;
  const headers = {};
  if (process.env.MTA_API_KEY) {
    headers['x-api-key'] = process.env.MTA_API_KEY;
  }
  const response = await axios.get(url, { responseType: 'arraybuffer', headers });

  try {
    return GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
      new Uint8Array(response.data)
    );
  } catch (decodeErr) {
    // Protobuf decode failed — the response was probably an error page, not binary feed data
    const body = Buffer.from(response.data).toString('utf8').slice(0, 300);
    throw new Error(`MTA feed decode failed (HTTP ${response.status}). Response: ${body}`);
  }
}

async function getArrivals(type, stopId) {
  let feedPath;
  if (type === 'lirr') {
    feedPath = 'lirr%2Fgtfs-lirr';
  } else {
    feedPath = SUBWAY_PREFIX_TO_FEED[stopId[0].toUpperCase()];
    if (!feedPath) feedPath = 'nyct%2Fgtfs';
  }

  const feed = await fetchFeed(feedPath);
  const now = Math.floor(Date.now() / 1000);
  const arrivals = [];

  for (const entity of feed.entity) {
    if (!entity.tripUpdate) continue;
    const trip = entity.tripUpdate.trip;

    for (const stu of entity.tripUpdate.stopTimeUpdate) {
      // Match parent stop and both directional variants (e.g. A41, A41N, A41S)
      if (!stu.stopId || !stu.stopId.startsWith(stopId)) continue;

      const timeData = stu.arrival || stu.departure;
      if (!timeData || timeData.time == null) continue;

      // protobufjs represents int64 as Long objects
      const arrivalEpoch = timeData.time.toNumber
        ? timeData.time.toNumber()
        : Number(timeData.time);

      if (arrivalEpoch < now) continue;

      const direction = stu.stopId.endsWith('N') ? 'Northbound'
                      : stu.stopId.endsWith('S') ? 'Southbound'
                      : '';

      const routeId = trip.routeId || '?';
      const routeLabel = type === 'lirr'
        ? (LIRR_ROUTE_NAMES[routeId] || `Branch ${routeId}`)
        : routeId;

      arrivals.push({
        routeId: routeLabel,
        direction,
        minutesAway: Math.round((arrivalEpoch - now) / 60),
        arrivalTime: new Date(arrivalEpoch * 1000).toLocaleTimeString('en-US', {
          hour: '2-digit', minute: '2-digit', timeZone: 'America/New_York'
        })
      });
    }
  }

  return arrivals
    .sort((a, b) => a.minutesAway - b.minutesAway)
    .slice(0, 15);
}

module.exports = { getArrivals };
