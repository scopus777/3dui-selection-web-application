FROM ubuntu:latest
ARG DEBIAN_FRONTEND=noninteractive
RUN apt -y update
RUN apt -y upgrade
RUN apt-get -y install nodejs
RUN apt -y install npm
RUN mkdir /opt/s3dit/
COPY . /opt/s3dit/

WORKDIR /opt/s3dit/server/

RUN cd /opt/s3dit/server
RUN mv /opt/s3dit/db.js.docker /opt/s3dit/db.js

RUN cd /opt/s3dit/ && npm i
RUN cd /opt/s3dit/server/ && npm i

EXPOSE 3000

CMD ["node", "/opt/s3dit/bin/www"]
