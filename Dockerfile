FROM centos/s2i-base-centos7

ENV SUMMARY="OpenShift SSL verify"
ENV DESCRIPTION="Application runtime for SSL Verifier"
ENV TZ="Europe/Berlin"

LABEL summary="$SUMMARY" \
      description="$DESCRIPTION" \
      io.k8s.description="$DESCRIPTION" \
      io.k8s.display-name="sslverify" \
      com.redhat.component="sslverify-container"

USER root

# Copy code
ADD . $HOME

# Upgrade packages
RUN yum -y update

# Adding Node Version manager and install app
RUN export NVM_DIR="$HOME/.nvm" && mkdir -p $NVM_DIR && \
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash && \
  chmod +x $HOME/.nvm/nvm.sh && \
  echo "export NVM_DIR=\"$HOME/.nvm\"" >> ~/.bashrc && \
  echo "[ -s \"$NVM_DIR/nvm.sh\" ] && \. \"$NVM_DIR/nvm.sh\"  # This loads nvm" >> ~/.bashrc && \
  source $NVM_DIR/nvm.sh && nvm install v8 && nvm use v8 && \
  chown -R default $HOME && \
  rm -rf $HOME/node_modules/ && cd $HOME && npm i 

# Clean Up cache
RUN rm -rf /tmp/setup && yum clean all && rm -rf /var/cache/yum

USER 1000

ENTRYPOINT ["node", "index.js"]