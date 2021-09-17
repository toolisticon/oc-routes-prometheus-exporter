FROM centos/s2i-base-centos7

ENV SUMMARY="OpenShift SSL verify"
ENV DESCRIPTION="Application runtime for SSL Verifier"
ENV AUTHOR="Holisticon AG"
ENV TZ="Europe/Berlin"
ENV NVM_DIR="$HOME/.nvm"
ENV CONSOLE_LOG="true"
ENV LOG_LEVEL="INFO"

LABEL summary="$SUMMARY" \
      description="$DESCRIPTION" \
      version="$VERSION" \
      author="$AUTHOR" \
      io.k8s.description="$DESCRIPTION" \
      io.k8s.display-name="routesverify" \
      io.k8s.tags="ssl,certificates,routes" \
      com.redhat.component="routes-verify-container"\
      org.label-schema.license=MIT

USER root

# Copy code
ADD . $HOME

# Upgrade packages and clean up cache 
RUN yum -y update && rm -rf /tmp/setup && yum clean all && rm -rf /var/cache/yum

# Adding Node Version manager and install app
RUN export NVM_DIR="$HOME/.nvm" && mkdir -p $NVM_DIR && \
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash && \
  chmod +x $HOME/.nvm/nvm.sh && \
  echo "export NVM_DIR=\"$HOME/.nvm\"" >> ~/.bashrc && \
  echo "[ -s \"$NVM_DIR/nvm.sh\" ] && \. \"$NVM_DIR/nvm.sh\"  # This loads nvm" >> ~/.bashrc && \
  source $NVM_DIR/nvm.sh && nvm install v16 && nvm use v16 && \
  chown -R default $HOME && \
  rm -rf $HOME/node_modules/ && cd $HOME && npm i  && \
  /usr/bin/fix-permissions ${NVM_DIR}/* && /usr/bin/fix-permissions ${HOME}/* && \
  mv $HOME/bin/entrypoint.sh /usr/local/bin/entrypoint.sh && \
  /usr/bin/fix-permissions /usr/local/bin/* && chmod +x /usr/local/bin/* && mkdir -p ${HOME}/.kube && \
 /usr/bin/fix-permissions ${NVM_DIR}/* && /usr/bin/fix-permissions ${HOME}/* && /usr/bin/fix-permissions ${HOME}/.kube/ && \
 chown -R $USER:$(id -gn $USER) /opt/app-root/src/.config

USER 1000

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]