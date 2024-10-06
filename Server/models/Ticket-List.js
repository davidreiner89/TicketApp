const Ticket = require("./Ticket");

// Creo una clase que se encargara de manejar todos los eventos relacionados con tickets.
class TicketList {
  constructor() {
    this.ultimoNumero = 0; // Variable para guardar el ultimo numero de ticket generado.
    this.pendientes = []; // Array donde se almacenaran los tickets pendientes por atender.
    this.asignados = []; // Array donde se almacenan los tickets asignados a un escitorio.
  }

  //  Metodo para obtener el proximo numero de ticket disponible.
  get siguienteNumero() {
    this.ultimoNumero++;
    return this.ultimoNumero;
  }

  // Metodo para traer los 3 tickets que se veran en las tarjetas y 10 en el historial
  get ultimos13() {
    return this.asignados.slice(0, 13);
  }

  // Metodo para crear un nuevo ticket
  crearTicket() {
    const nuevoTicket = new Ticket(this.siguienteNumero); //  Creo un nuevo ticket con el numero de ticket correspondiente.
    this.pendientes.push(nuevoTicket); //  Agregamos el nuevo ticket a la lista de pendientes.
    return nuevoTicket;
  }

  // Metodo para asignar un ticket
  asignarTicket(agente, escritorio) {
    // Si no hay tickets pendientes devuelve null
    if (this.pendientes.length === 0) {
      return null;
    }

    const siguienteTicket = this.pendientes.shift(); // Sacamos el primer ticket de la cola de pendiente.

    // Asignamos el agente y el escritorio al ticket
    siguienteTicket.agente = agente;
    siguienteTicket.escritorio = escritorio;

    // Agregamos el ticket al principio del array de la lista de asignados.
    this.asignados.unshift(siguienteTicket);
    return siguienteTicket;
  }
}

module.exports = TicketList;
