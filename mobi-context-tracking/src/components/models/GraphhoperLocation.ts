// {
//     "hits": [
//         {
//             "point": {
//                 "lat": 49.0135248,
//                 "lng": 8.40435918703854
//             },
//             "extent": [
//                 8.4032308,
//                 49.0130412,
//                 8.4054431,
//                 49.0140237
//             ],
//             "name": "Schloss Karlsruhe",
//             "country": "Deutschland",
//             "countrycode": "DE",
//             "city": "Karlsruhe",
//             "state": "Baden-Württemberg",
//             "street": "Schlossbezirk",
//             "postcode": "76131",
//             "osm_id": 316433983,
//             "osm_type": "W",
//             "housenumber": "1",
//             "osm_key": "historic",
//             "osm_value": "castle",
//             "house_number": "1"
//         },
//         {
//             "point": {
//                 "lat": 49.004698899999994,
//                 "lng": 8.426557424852454
//             },
//             "extent": [
//                 8.4248627,
//                 49.0038035,
//                 8.4283462,
//                 49.0052761
//             ],
//             "name": "Hochschule für Musik Karlsruhe",
//             "country": "Deutschland",
//             "countrycode": "DE",
//             "city": "Karlsruhe",
//             "state": "Baden-Württemberg",
//             "street": "Schlachthausstraße",
//             "postcode": "76131",
//             "osm_id": 258679943,
//             "osm_type": "W",
//             "osm_key": "amenity",
//             "osm_value": "university"
//         },
//         {
//             "point": {
//                 "lat": 49.0113834,
//                 "lng": 8.400447844799537
//             },
//             "extent": [
//                 8.4002413,
//                 49.0110334,
//                 8.4012974,
//                 49.0117319
//             ],
//             "name": "Amtsgericht Karlsruhe",
//             "country": "Deutschland",
//             "countrycode": "DE",
//             "city": "Karlsruhe",
//             "state": "Baden-Württemberg",
//             "street": "Schlossplatz",
//             "postcode": "76131",
//             "osm_id": 338749,
//             "osm_type": "R",
//             "housenumber": "23",
//             "osm_key": "amenity",
//             "osm_value": "courthouse",
//             "house_number": "23"
//         },
//         {
//             "point": {
//                 "lat": 49.2120732,
//                 "lng": 8.6617581
//             },
//             "name": "Schlacht bei Mingolsheim",
//             "country": "Deutschland",
//             "countrycode": "DE",
//             "city": "Bad Schönborn",
//             "state": "Baden-Württemberg",
//             "street": "Ahornstraße",
//             "postcode": "76669",
//             "osm_id": 5982403859,
//             "osm_type": "N",
//             "osm_key": "historic",
//             "osm_value": "battlefield"
//         },
//         {
//             "point": {
//                 "lat": 48.8985052,
//                 "lng": 8.4024783
//             },
//             "name": "Schluttenbach",
//             "country": "Deutschland",
//             "countrycode": "DE",
//             "city": "Ettlingen",
//             "state": "Baden-Württemberg",
//             "postcode": "76275",
//             "osm_id": 24958600,
//             "osm_type": "N",
//             "osm_key": "place",
//             "osm_value": "village"
//         }
//     ],
//     "locale": "de"
// }

import { GraphhoperLocationPoint } from "./GraphhoperLocationPoint";

interface GraphhoperLocation {
  point: GraphhoperLocationPoint;
  name: string;
  country?: string;
  countrycode?: string;
  city?: string;
  state?: string;
  street?: string;
  postcode?: string;
  housenumber?: string;
}

export { GraphhoperLocation };
