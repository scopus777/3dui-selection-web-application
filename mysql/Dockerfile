FROM ubuntu:latest
ARG DEBIAN_FRONTEND=noninteractive
# Set the locale
RUN apt -y update
RUN apt -y upgrade
RUN apt -y install mariadb-server

COPY . /mysql
COPY mysql.conf /etc/mysql/mariadb.conf.d/50-server.cnf

ENTRYPOINT ["/mysql/entrypoint.sh"]

EXPOSE 3306

