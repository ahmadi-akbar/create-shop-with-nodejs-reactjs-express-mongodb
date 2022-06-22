
/**
 * Module dependencies.
 */
import app from '../app/index.mjs';
// import debugLib from 'debug';
import http from 'http';
<<<<<<< HEAD
import VARIABLE from '#v/variables';
=======
// import VARIABLE from '#v/variables';
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
// const debug = debugLib('your-project-name:server');

/**
 * Get port from environment and store in Express.
 */
<<<<<<< HEAD
var port = normalizePort(VARIABLE.SERVER_PORT);
=======
var port = normalizePort( process.env.SERVER_PORT);
>>>>>>> 496de9eb5f488a591bacfd6f8d28b7e365dbd606
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}
