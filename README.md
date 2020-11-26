# 3dui-selection-web-application
The name of this web application is S3DIT and stands for Selection of 3D Interaction Techniques. This tool was developed as part of a doctoral thesis. The goal of the thesis was to support developers of VR applications in finding suitable 3D interaction techniques. A 3D interaction technique maps spatial input recognized by an input device on actions in the virtual world. Over time several interaction techniques were found through literature review and by trying out different VR applications. This tool allows the exploration of the resulting set of over 100 interaction techniques. The techniques can either be filtered according to the dimensions of a taxonomy or suggested based on the data of a user study. This allows matching the techniques with the demands of the target VR system and the application scenario. However, the presented techniques should not be taken as complete and implemented as they are. Instead, the techniques should be considered as an impulse on how to solve specific issues arising in the interaction in VR. Subcomponents of the techniques may be suitable for the application and should be carefully integrated with existing interaction forms of the application.

## Running Version
A running version of this web application can be found [here](https://s3dit.cs.uni-potsdam.de).

## Project Details
The front end was developed with REACT (folder *client*) and the back end with Node.JS (folder *server*). MySQL is used as the database managment system. The script which generates the database tables can be found in the folder *mysql*.

## Execution
[Node.JS](https://nodejs.org/), [NPM](https://www.npmjs.com/) and [MySQL](https://www.mysql.com/) is need to run the application.

The database tables should be generated with the help of the script *mysql/database.sql*. The connection details for the database can be found in the file *server/db.js* and need to be adapted.

The client can be started by running the following commands in the client directory:
```
npm install
npm start
```

The server can be started by running the following commands in the server directory:
```
SET PORT=3001
node bin/www
```
