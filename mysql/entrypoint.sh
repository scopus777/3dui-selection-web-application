#!/bin/bash
service mysql restart
mysql  -e "create database vr_test_database"
mysql  -e "use mysql; update user set authentication_string=PASSWORD('playfriends') where User='root'"
mysql -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'playfriends' WITH GRANT OPTION;"
mysql -uroot -pplayfriends vr_test_database < /mysql/database.sql
/bin/bash