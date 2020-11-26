FROM ubuntu:latest
ARG DEBIAN_FRONTEND=noninteractive
RUN apt -y update
RUN apt -y upgrade
RUN apt-get -y install nodejs
RUN apt -y install npm
RUN mkdir /opt/s3dit/
COPY . /opt/s3dit/
RUN npm install -g npm@latest
WORKDIR /opt/s3dit/client/

RUN cd /opt/s3dit/client
RUN mv /opt/s3dit/package.json.docker /opt/s3dit/package.json

RUN cd /opt/s3dit/client/ && npm i

EXPOSE 80
WORKDIR /opt/s3dit/client/
CMD ["npm", "start"]