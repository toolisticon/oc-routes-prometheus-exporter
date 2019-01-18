const prometheus = require('../lib/prometheus');

const validData = JSON.parse(`
{  
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
    console.log(result);
    expect(result.indexOf('security_ssl_mozilla_observatory{algorithm_version="2",end_time="1547804767000",grade="D",hidden="false",likelihood_indicator="MEDIUM",response_headers_cache-control="no-cache, no-store, max-age=0, must-revalidate",response_headers_content-type="996616800000",response_headers_date="1547804765000",response_headers_expires="946681200000",response_headers_pragma="no-cache",response_headers_set-cookie="556448b8f044ea9c0fe56ec8eabb3577=6dda08a289298b570c8daa5a12e94408; path=/; HttpOnly; Secure",response_headers_transfer-encoding="chunked",response_headers_x-application-context="193033926000000",response_headers_x-content-type-options="nosniff",response_headers_x-xss-protection="1; mode=block",scan_id="9783173",score="35",start_time="1547804762000",state="FINISHED",status_code="404",tests_failed="3",tests_passed="9",tests_quantity="12",url="sub.domain-sample.com",security_ssl_mozilla_observatory{algorithm_version="2",end_time="1547804767000",grade="D",hidden="false",likelihood_indicator="MEDIUM",response_headers_cache-control="no-cache, no-store, max-age=0, must-revalidate",response_headers_content-type="996616800000",response_headers_date="1547804765000",response_headers_expires="946681200000",response_headers_pragma="no-cache",response_headers_set-cookie="556448b8f044ea9c0fe56ec8eabb3577=6dda08a289298b570c8daa5a12e94408; path=/; HttpOnly; Secure",response_headers_transfer-encoding="chunked",response_headers_x-application-context="193033926000000",response_headers_x-content-type-options="nosniff",response_headers_x-xss-protection="1; mode=block",scan_id="9783173",score="35",start_time="1547804762000",state="FINISHED",status_code="404",tests_failed="3",tests_passed="9",tests_quantity="12",url="sub.domain-sample.com",} 35.0') === 0).toBeTruthy();
  });
});
