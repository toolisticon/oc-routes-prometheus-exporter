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
    //
  });
  it('should convert objects with nesting and dates', () => {
    prometheus.addMetric(validData);
    const result = prometheus.renderMetrics();
    expect(result.indexOf('security_ssl_mozilla_observatory{algorithm_version="2",end_time="1547804767000",grade="D",hidden="false",likelihood_indicator="MEDIUM",scan_id="9783173",score="35",start_time="1547804762000",state="FINISHED",status_code="404",tests_failed="3",tests_passed="9",tests_quantity="12",url="sub.domain-sample.com",security_ssl_mozilla_observatory{algorithm_version="2",end_time="1547804767000",grade="D",hidden="false",likelihood_indicator="MEDIUM",scan_id="9783173",score="35",start_time="1547804762000",state="FINISHED",status_code="404",tests_failed="3",tests_passed="9",tests_quantity="12",url="sub.domain-sample.com",} 35.0') >= 0).toBeTruthy();
  });
});
