const metricName = 'security_ssl_mozilla_observatory';

const resultStore = {};

function json2prom (jsonObject) {
  const quantile = jsonObject.score;
  let promObject = `${metricName}{`;
  Object.keys(jsonObject).map((key) => {
    const value = jsonObject[key];
    promObject += `${key}="${value}",`;
  });
  promObject += `${promObject}} ${quantile}\n`;
  return promObject;
}

function addMetric (data) {
  json2prom(data);
  resultStore[data.url] = data;
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
