require('dotenv').config();

const Server = require('./app/bootstrap/server');

const server = new Server(__dirname);

server.listen();
