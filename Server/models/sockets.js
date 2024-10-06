const TicketList = require("./Ticket-List");

class Sockets {
  constructor(io) {
    this.io = io;

    // Instancio los eventos del ticket-list
    this.ticketList = new TicketList();

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      console.log("Cliente Conectado");

      // Escucho el evento de solicitar ticket de parte del cliente
      socket.on("solicitar-ticket", (data, callback) => {
        const nuevoTicket = this.ticketList.crearTicket();
        // Envío la respuesta al cliente
        // console.log(nuevoTicket)
        callback(nuevoTicket);
      });

      // Escucho el evento del cliente para trabajar con el ticket
      // Desestructuro el usuario enviado por el cliente
      socket.on(
        "manejar-ticket",
        ({ agenteLocal, escritorioLocal }, callback) => {
          // console.log(agenteLocal, escritorioLocal);
          // Envio el ticket a trabajar al cliente
          const trabajarTicket = this.ticketList.asignarTicket(
            agenteLocal,
            escritorioLocal
          );
          callback(trabajarTicket);

          // Emito todos los tickets
          this.io.emit("lista-tickets", this.ticketList.ultimos13);
        }
      );
    });
  }
}

module.exports = Sockets;
