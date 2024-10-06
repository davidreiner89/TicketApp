// Servidor de Express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");

const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Http server
    this.server = http.createServer(this.app);

    // Configuraciones de sockets
    this.io = socketio(this.server, {
      /* configuraciones */
    });

    // Inicializamos los sockets
    this.sockets = new Sockets(this.io);
  }

  middlewares() {
    // Desplegar el directorio público
    // this.app.use(express.static(path.resolve(__dirname, "../public")));

    // CORS
    this.app.use(cors());

    // Metodo get para obtener los ultimos tickets
    this.app.get("/listar", (req, res) => {
      res.json({
        ok: true,
        lista: this.sockets.ticketList.ultimos13,
      });
    });
  }

  execute() {
    // Inicializar Middlewares
    this.middlewares();

    // Inicializar Server
    this.server.listen(this.port, () => {
      console.log("Server corriendo en puerto:", this.port);
    });
  }
}

module.exports = Server;
