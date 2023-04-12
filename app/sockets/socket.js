let usuarios = [];
let ioSocket;

const desconectar = (cliente, io) => {

    cliente.on('disconnect', (payload, callback) => {
        try {
            borrarUsuario(cliente);
            suscriptionDashboard(io);
        } catch (e) { }

    });
};

const borrarUsuario = (cliente) => {
    const eliminado = usuarios.filter(x => x.socket.id == cliente.id);
    try {
        usuarios = usuarios.filter(x => x.socket.id != cliente.id);
    } catch (e) { }
}

const configurarUsuario = (cliente, io) => {
    ioSocket = io;
    cliente.on('configurarUsuario', (payload, callback) => {
        try {
            const registro = {
                usuario: {
                    fullName: payload.usuario.fullName,
                    idUser: payload.usuario.idUser,
                    idDirection: payload.usuario.idDirection
                },
                subscriptions: [...payload.subscriptions],
                socket: {
                    id: cliente.id,
                    ua: cliente.handshake.headers['sec-ch-ua'],
                    mobile: cliente.handshake.headers['sec-ch-mobile'],
                    platform: cliente.handshake.headers['sec-ch-platform'],
                    agent: cliente.handshake.headers['user-agent'],
                }
            }
            const registrado = usuarios.filter(x => x.socket.id == cliente.id);
            if (registrado.length > 0) {
                if (registrado.usuario.idUser != payload.idUser) {
                    registrado.usuario = payload;
                }
            } else {
                usuarios.push(registro);
            }
            suscriptionDashboard(io);
        } catch (e) { }

    });
}

const suscriptionDashboard = (io) => {
    try {
        const subs = usuarios.filter(x => x.subscriptions.length > 0);
        for (let index = 0; index < subs.length; index++) {
            const sub = subs[index];
            if (sub.subscriptions.indexOf('dashboard') >= 0) {
                io.to(sub.socket.id).emit('dashboard-info', usuarios);
            }
        }
    } catch (e) { }

};

const recargarComedor = (idUser) => {
    try {
        const recargar = usuarios.filter(x => x.usuario.idUser == idUser);
        for (let index = 0; index < recargar.length; index++) {
            const usr = recargar[index];
            ioSocket.to(usr.socket.id).emit('recargar-comedor');
        }
    } catch (e) { }

};

const recargaNotificaciones = (idUser) => {
    try {
        const recargar = usuarios.filter(x => x.usuario.idUser == idUser);
        for (let index = 0; index < recargar.length; index++) {
            const usr = recargar[index];
            ioSocket.to(usr.socket.id).emit('recargar-notificaciones');
        }
    } catch (e) { }
}

const suscripciones = (cliente) => {
    cliente.on('actualizaSuscripciones', (payload, callback) => {
        try {
            const registrado = usuarios.filter(x => x.socket.id == cliente.id);
            if (registrado.length > 0) {
                registrado[0].subscriptions = payload;
            }
        } catch (e) { }

    });
}


module.exports = {
    desconectar,
    configurarUsuario,
    recargarComedor,
    recargaNotificaciones,
    suscripciones
};