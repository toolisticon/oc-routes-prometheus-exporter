const moment = require('moment');

// CONFIG
moment.suppressDeprecationWarnings = true;
const metricName = 'security_ssl_mozilla_observatory';
const resultStore = {};

function convertKeyValuePair (key, value) {
  if (value instanceof Object) {
    let result = '';
    Object.keys(value).map((subKey) => {
      const subValue = value[subKey];
      result += `${key.toLowerCase()}_${convertKeyValuePair(subKey, subValue)}`;
    });
    return result;
  } else {
    const date = moment(value);
    if (date.isValid()) {
      return `${key.toLowerCase()}="${date.valueOf()}",`;
    } else {
      return `${key.toLowerCase()}="${value}",`;
    }
  }
}

function json2prom (jsonObject) {
  const quantile = `${jsonObject.score}.0`;
  let promObject = `${metricName}{`;
  Object.keys(jsonObject).map((key) => {
    const value = jsonObject[key];
    promObject += convertKeyValuePair(key, value);
  });
  promObject += `${promObject}} ${quantile}\n`;
  return promObject;
}

/**
 * Add a valid http observatory data as metrics, e.g:
 *
 * {
   "algorithm_version":2,
   "end_time":"Fri, 18 Jan 2019 09:46:07 GMT",
   "grade":"D",
   "hidden":false,
   "likelihood_indicator":"MEDIUM",
   "response_headers":{
      "Cache-Control":"no-cache, no-store, max-age=0, must-revalidate",
      "Content-Type":"application/json;charset=UTF-8",
      "Date":"Fri, 18 Jan 2019 09:46:05 GMT",
      "Expires":"0",
      "Pragma":"no-cache",
      "Set-Cookie":"556448b8f044ea9c0fe56ec8eabb3577=6dda08a289298b570c8daa5a12e94408; path=/; HttpOnly; Secure",
      "Transfer-Encoding":"chunked",
      "X-Application-Context":"application:prod:8087",
      "X-Content-Type-Options":"nosniff",
      "X-XSS-Protection":"1; mode=block"
   },
   "scan_id":9783173,
   "score":35,
   "start_time":"Fri, 18 Jan 2019 09:46:02 GMT",
   "state":"FINISHED",
   "status_code":404,
   "tests_failed":3,
   "tests_passed":9,
   "tests_quantity":12,
   "url":"sub.domain-sample.com"
}
 *
 *
 * @param {*} dataAsJson
 */
function addMetric (dataAsJson) {
  json2prom(dataAsJson);
  resultStore[dataAsJson.url] = dataAsJson;
}

function renderMetrics () {
  let response = '';
  Object.keys(resultStore).map((key) => {
    response += json2prom(resultStore[key]);
  });
  return response;
}

module.exports = exports = {
  addMetric: addMetric,
  renderMetrics: renderMetrics
};
