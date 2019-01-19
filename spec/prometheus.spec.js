const prometheus = require('../lib/prometheus');

const validData = JSON.parse(`
{  
    "algorithm_version":2,
    "end_time":"Fri, 18 Jan 2019 09:46:07 GMT",
    "grade":"D",
    "hidden":false,
    "likelihood_indicator":"MEDIUM",
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
 `);

describe('prometheus', () => {
  /* eslint no-debugger: "off" */
  debugger;
  beforeEach(() => {
    prometheus.init();
  });

  describe('mozilla http observatory', () => {
    it('should add unknown score if invalid request', () => {
      prometheus.addMozillaMetric({});
      const result = prometheus.renderMetrics();
      expect(result.indexOf('security_ssl_mozilla_observatory{} NaN') >= 0).toBeTruthy();
    });
    it('should add additional data objects', () => {
      prometheus.addMozillaMetric({ quantile: 1 }, { key1: 'a', key2: 'b' });
      const result = prometheus.renderMetrics();
      expect(result.indexOf('security_ssl_mozilla_observatory{quantile="1",key1="a",key2="b",} 1.0') >= 0).toBeTruthy();
    });
    it('should convert data objects with nesting and dates', () => {
      prometheus.addMozillaMetric(validData);
      const result = prometheus.renderMetrics();
      expect(result.indexOf('security_ssl_mozilla_observatory{algorithm_version="2",end_time="1547804767000",grade="D",hidden="false",likelihood_indicator="MEDIUM",scan_id="9783173",score="35",start_time="1547804762000",state="FINISHED",status_code="404",tests_failed="3",tests_passed="9",tests_quantity="12",url="sub.domain-sample.com",} NaN') >= 0).toBeTruthy();
    });
  });
  describe('ssl details', () => {
    it('should add unknown score if invalid request', () => {
      prometheus.addExpireMetric({});
      const result = prometheus.renderMetrics();
      expect(result.indexOf('security_ssl_details{} NaN') >= 0).toBeTruthy();
    });
    it('should add additional data objects', () => {
      prometheus.addExpireMetric({ quantile: 200 }, { key1: 'a', key2: 'b' });
      const result = prometheus.renderMetrics();
      expect(result.indexOf('security_ssl_details{quantile="200",key1="a",key2="b",} 200.0') >= 0).toBeTruthy();
    });
  });
});
