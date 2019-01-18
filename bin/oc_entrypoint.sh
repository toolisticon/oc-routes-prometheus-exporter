#!/bin/bash
#

oc_master_url=${OPENSHIFT_MASTER_URL:-$KUBERNETES_PORT_443_TCP_ADDR}

NVM_DIR="$HOME/.nvm"
oc login $oc_master_url --token=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)
source $NVM_DIR/nvm.sh
nvm use v8
node index.js
