# Monitor OpenShift Routes in Prometheus

[![License](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)
[![Build Status](https://travis-ci.org/toolisticon/oc-routes-prometheus-exporter.svg?branch=master)](https://travis-ci.org/toolisticon/oc-routes-prometheus-exporter)
[![Docker Build Status](https://img.shields.io/docker/automated/toolisticon/oc-routes-prometheus-exporter.svg)](https://hub.docker.com/r/toolisticon/oc-routes-prometheus-exporter/)
[![npm version](https://badge.fury.io/js/%40toolisticon%2Foc-routes-prometheus-exporter.svg)](https://badge.fury.io/js/%40toolisticon%2Foc-routes-prometheus-exporter)
[![npm downloads](https://img.shields.io/npm/dm/%40toolisticon%2Foc-routes-prometheus-exporter.svg)](https://www.npmjs.com/package/%40toolisticon%2Foc-routes-prometheus-exporter)
[![Docker Stars](https://img.shields.io/docker/stars/toolisticon/oc-routes-prometheus-exporter.svg)](https://hub.docker.com/r/toolisticon/oc-routes-prometheus-exporter/)
[![Greenkeeper badge](https://badges.greenkeeper.io/toolisticon/oc-routes-prometheus-exporter.svg)](https://greenkeeper.io/)

## Usage

This nodejs application assumes that the container in which the application is running has already a valid OpenShift session. The entrypoint will try to autologin via a service account.
So all you need is to create a image with the desired openschift installed:


```
FROM toolisticon/oc-routes-prometheus-exporter:latest

ENV SUMMARY="openshift-ssl-verify runtime image"
ENV DESCRIPTION="openshift-ssl-verify runtime"
ENV TZ="Europe/Berlin"
ENV OPENSHIFT_VERSION=3.10.0
ENV NVM_DIR="$HOME/.nvm"

LABEL summary="$SUMMARY" \
      description="$DESCRIPTION" \
      io.k8s.description="$DESCRIPTION" \
      io.k8s.display-name="sslverify" \
      io.openshift.tags="security,sslverify,platform" \
      com.redhat.component="sslverify-container"

USER 0

# Update
RUN yum -y update && yum clean all && rm -rf /var/cache/yum

# Install oc and jq
RUN yum -y install centos-release-openshift-origin && \
    yum -y install origin-clients-${OPENSHIFT_VERSION} && \
    yum -y install epel-release && yum -y install jq

USER 1000
```

The pod should start with this output:
```
Now using node v8.15.0 (npm v6.4.1)
[2019-01-18T14:59:04.929Z] prometheus-exporter listening at 9000
[2019-01-18T15:00:00.005Z] Triggering check
[2019-01-18T15:00:00.006Z] Start reading route information.
[2019-01-18T15:00:05.133Z] Start triggering scan.
```

## Sample Values

The metrics are available via via localhost:9000 on the pod:

```
security_ssl_mozilla_observatory{algorithm_version="2",end_time="1548079211000",grade="D",hidden="false",likelihood_indicator="MEDIUM",scan_id="9806703",score="35",start_time="1548079207000",state="FINISHED",status_code="404",tests_failed="3",tests_passed="9",tests_quantity="12",url="sample-config.sample.com",name="sample-config",namespace="project2",labels_app="myapp",labels_environment="dev",} 35.0
security_ssl_details{valid="true",valid_from="1545553135000",valid_to="1553329135000",days_remaining="60",url="api-test.sample.com",status="200",name="api-test",namespace="project1",labels_app="myapp",labels_environment="test",} 200.0
security_ssl_expire_days_remaining{url="api-test.sample.com",name="api-test",namespace="project1",labels_app="myapp",labels_environment="test",} 60.0
```

If you want to complete use

## Configuration

You can override the config via environment variables:
```
   SERVER_PORT: // set desired port for prometheus endpoint, defaults to 9000
   CRON: // set cron pattern, default is '0 0 * * * *',
   LOG_LEVEL: // set log level, default is 'ERROR' ('INFO' outputs details info)
```

You'll find a Grafana Dashboard [here](https://grafana.com/dashboards/9693):

![](https://github.com/toolisticon/oc-routes-prometheus-exporter/raw/develop/docs/images/sample_dashboard.png)

## Troubleshooting

If the service account does not have access to projects, you will see this message
```
Logged into "https://...:8443" as "system:serviceaccount:security:sslverify" using the token provided.

You don't have any projects. Contact your system administrator to request a project.
Welcome! See 'oc help' to get started.
```

## Development

### Debug

To debug run the following command:
```
node --inspect-brk index.js
```

To debug unit tests:

```
npm run test:debug
```
