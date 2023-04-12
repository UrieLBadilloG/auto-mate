// const cookieParser = require('cookie-parser');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const socket = require('socket.io');
const http = require('http');

const sockets = require('../sockets/socket');

class Server {

    constructor(dirname) {
        this.app = express();
        this.port = process.env.PORT;
        this.middlewares(dirname);
        this.routes({
            auth: '/api/auth',
        });
        this.httpServer = new http.Server(this.app);
        this.io = new socket.Server(this.httpServer, {
            cors: { origin: process.env.PRD == 1 ? 'https://auto-mate.herokuapp.com' : 'http://localhost:4200' }
        });
    }

    middlewares(dirname) {
        this.app.use(cors());
        this.app.use(helmet({
            contentSecurityPolicy: false,
        }));
        // this.app.use(cookieParser());
        this.app.use(express.static(dirname + '/public'));
        this.app.use(express.json());
        this.app.use(compression());
    }

    routes(urls) {
        for(var defs in urls){
            this.app.use(urls[defs], require('../routes/' + defs));
        }
    }

    listen() {
        this.httpServer.listen(this.port, () => {
            console.log('Running on port', this.port);
        });
        this.listenSockets();

    }

    listenSockets() {
        this.io.on('connection', (cliente) => {
            sockets.configurarUsuario(cliente, this.io);
            sockets.desconectar(cliente, this.io);
            sockets.suscripciones(cliente);
        });

    }


}

module.exports = Server;
