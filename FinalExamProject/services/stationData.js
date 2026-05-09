// Curated subway stations — stopId is the GTFS parent stop (no N/S suffix)
const SUBWAY_STATIONS = [
  // Manhattan - 1/2/3/4/5/6
  { stopId: '101', name: 'Van Cortlandt Park-242 St',  borough: 'Bronx',      lines: ['1'] },
  { stopId: '120', name: 'Times Sq-42 St',             borough: 'Manhattan',  lines: ['1','2','3'] },
  { stopId: '127', name: '34 St-Penn Station',         borough: 'Manhattan',  lines: ['1','2','3'] },
  { stopId: '132', name: 'Chambers St',                borough: 'Manhattan',  lines: ['1','2','3'] },
  { stopId: '401', name: 'Grand Central-42 St',        borough: 'Manhattan',  lines: ['4','5','6'] },
  { stopId: '418', name: 'Fulton St',                  borough: 'Manhattan',  lines: ['4','5'] },
  { stopId: '621', name: '125 St',                     borough: 'Manhattan',  lines: ['4','5','6'] },
  { stopId: '635', name: 'Atlantic Av-Barclays Ctr',   borough: 'Brooklyn',   lines: ['4','5'] },
  // A/C/E
  { stopId: 'A02', name: 'Inwood-207 St',              borough: 'Manhattan',  lines: ['A'] },
  { stopId: 'A27', name: '34 St-Penn Station',         borough: 'Manhattan',  lines: ['A','C','E'] },
  { stopId: 'A32', name: 'West 4 St',                  borough: 'Manhattan',  lines: ['A','C','E','B','D','F','M'] },
  { stopId: 'A36', name: 'Fulton St',                  borough: 'Manhattan',  lines: ['A','C'] },
  { stopId: 'A41', name: 'Jay St-MetroTech',           borough: 'Brooklyn',   lines: ['A','C','F','R'] },
  { stopId: 'A55', name: 'Far Rockaway-Mott Av',       borough: 'Queens',     lines: ['A'] },
  { stopId: 'A65', name: 'Howard Beach-JFK Airport',   borough: 'Queens',     lines: ['A'] },
  // B/D/F/M
  { stopId: 'D01', name: 'Norwood-205 St',             borough: 'Bronx',      lines: ['D'] },
  { stopId: 'D11', name: '161 St-Yankee Stadium',      borough: 'Bronx',      lines: ['B','D'] },
  { stopId: 'D14', name: '34 St-Herald Sq',            borough: 'Manhattan',  lines: ['B','D','F','M','N','Q','R','W'] },
  { stopId: 'D20', name: 'Atlantic Av-Barclays Ctr',   borough: 'Brooklyn',   lines: ['B','D','N','Q','R','W'] },
  { stopId: 'D26', name: 'Stillwell Av',               borough: 'Brooklyn',   lines: ['B','D','F','N','Q'] },
  { stopId: 'F01', name: 'Jamaica-179 St',             borough: 'Queens',     lines: ['F'] },
  { stopId: 'F11', name: 'Roosevelt Island',           borough: 'Queens',     lines: ['F'] },
  // G
  { stopId: 'G22', name: 'Court Sq',                   borough: 'Queens',     lines: ['G','E','M','7'] },
  { stopId: 'G36', name: 'Church Av',                  borough: 'Brooklyn',   lines: ['G'] },
  // J/Z
  { stopId: 'J12', name: 'Jamaica Center-Parsons/Archer', borough: 'Queens', lines: ['J','Z'] },
  { stopId: 'J27', name: 'Broad St',                   borough: 'Manhattan',  lines: ['J','Z'] },
  // N/Q/R/W
  { stopId: 'R01', name: 'Astoria-Ditmars Blvd',       borough: 'Queens',     lines: ['N','W'] },
  { stopId: 'R11', name: 'Queensboro Plaza',           borough: 'Queens',     lines: ['N','W','7'] },
  { stopId: 'R16', name: 'Times Sq-42 St',             borough: 'Manhattan',  lines: ['N','Q','R','W'] },
  { stopId: 'R17', name: '34 St-Herald Sq',            borough: 'Manhattan',  lines: ['N','Q','R','W'] },
  { stopId: 'R22', name: 'City Hall',                  borough: 'Manhattan',  lines: ['N','R','W'] },
  { stopId: 'R30', name: 'Atlantic Av-Barclays Ctr',   borough: 'Brooklyn',   lines: ['N','Q','R'] },
  { stopId: 'R45', name: 'Bay Ridge-95 St',            borough: 'Brooklyn',   lines: ['R'] },
  // L
  { stopId: 'L01', name: '8 Av',                       borough: 'Manhattan',  lines: ['L'] },
  { stopId: 'L03', name: '14 St-Union Sq',             borough: 'Manhattan',  lines: ['L','N','Q','R','W','4','5','6'] },
  { stopId: 'L17', name: 'Canarsie-Rockaway Pkwy',     borough: 'Brooklyn',   lines: ['L'] },
  // 7
  { stopId: '701', name: 'Flushing-Main St',           borough: 'Queens',     lines: ['7'] },
  { stopId: '702', name: 'Mets-Willets Point',         borough: 'Queens',     lines: ['7'] },
  { stopId: '719', name: 'Times Sq-42 St',             borough: 'Manhattan',  lines: ['7'] },
  // S (Shuttles)
  { stopId: 'S01', name: 'Times Sq',                   borough: 'Manhattan',  lines: ['S'] },
  { stopId: 'S03', name: 'Grand Central',              borough: 'Manhattan',  lines: ['S'] },
];

// Curated LIRR stations — numeric string stop IDs from MTA GTFS static data
const LIRR_STATIONS = [
  { stopId: '1',   name: 'Long Island City',       lines: ['Port Washington', 'Hempstead'] },
  { stopId: '2',   name: 'Woodside',               lines: ['Port Washington', 'Oyster Bay', 'Hempstead', 'Far Rockaway', 'Long Beach', 'West Hempstead'] },
  { stopId: '3',   name: 'Forest Hills',           lines: ['Hempstead', 'Long Beach', 'Far Rockaway', 'West Hempstead', 'Oyster Bay'] },
  { stopId: '4',   name: 'Kew Gardens',            lines: ['Hempstead', 'Long Beach', 'Far Rockaway', 'West Hempstead', 'Oyster Bay'] },
  { stopId: '5',   name: 'Jamaica',                lines: ['All LIRR lines'] },
  { stopId: '8',   name: 'Penn Station (NY)',      lines: ['All LIRR lines'] },
  { stopId: '9',   name: 'Atlantic Terminal',      lines: ['Babylon', 'Long Beach', 'Far Rockaway', 'West Hempstead', 'City Terminal Zone'] },
  { stopId: '16',  name: 'Floral Park',            lines: ['Hempstead', 'Oyster Bay', 'Port Jefferson', 'Ronkonkoma'] },
  { stopId: '18',  name: 'Garden City',            lines: ['Hempstead'] },
  { stopId: '21',  name: 'Hempstead',              lines: ['Hempstead'] },
  { stopId: '36',  name: 'Rockville Centre',       lines: ['Long Beach', 'Far Rockaway'] },
  { stopId: '37',  name: 'Baldwin',                lines: ['Long Beach', 'Far Rockaway'] },
  { stopId: '38',  name: 'Freeport',               lines: ['Long Beach', 'Far Rockaway'] },
  { stopId: '39',  name: 'Merrick',                lines: ['Long Beach', 'Far Rockaway'] },
  { stopId: '40',  name: 'Bellmore',               lines: ['Long Beach', 'Far Rockaway'] },
  { stopId: '41',  name: 'Wantagh',                lines: ['Long Beach', 'Far Rockaway'] },
  { stopId: '42',  name: 'Seaford',                lines: ['Long Beach', 'Far Rockaway'] },
  { stopId: '56',  name: 'Babylon',                lines: ['Babylon', 'Montauk'] },
  { stopId: '57',  name: 'Bay Shore',              lines: ['Babylon'] },
  { stopId: '58',  name: 'Islip',                  lines: ['Babylon'] },
  { stopId: '62',  name: 'Great River',            lines: ['Babylon'] },
  { stopId: '68',  name: 'Amityville',             lines: ['Babylon'] },
  { stopId: '110', name: 'Hicksville',             lines: ['Port Jefferson', 'Oyster Bay', 'Ronkonkoma'] },
  { stopId: '112', name: 'Bethpage',               lines: ['Ronkonkoma'] },
  { stopId: '113', name: 'Farmingdale',            lines: ['Ronkonkoma'] },
  { stopId: '116', name: 'Ronkonkoma',             lines: ['Ronkonkoma'] },
  { stopId: '142', name: 'Huntington',             lines: ['Port Jefferson', 'Oyster Bay'] },
  { stopId: '149', name: 'Port Jefferson',         lines: ['Port Jefferson'] },
  { stopId: '176', name: 'Great Neck',             lines: ['Port Washington'] },
  { stopId: '177', name: 'Port Washington',        lines: ['Port Washington'] },
];

function getAllStations() {
  return { subway: SUBWAY_STATIONS, lirr: LIRR_STATIONS };
}

function getStationByStopId(stopId, type) {
  const list = type === 'lirr' ? LIRR_STATIONS : SUBWAY_STATIONS;
  return list.find(s => s.stopId === stopId) || { name: stopId, lines: [] };
}

module.exports = { getAllStations, getStationByStopId, SUBWAY_STATIONS, LIRR_STATIONS };
