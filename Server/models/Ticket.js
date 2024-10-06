const { v4: uuidv4 } = require("uuid");

// Creo mi clase de los Tickets, con sus atributos
class Ticket {
  constructor(number) {
    this.id = uuidv4(); // Le asigno un ID único a cada ticket
    this.number = number; // numero del ticket
    this.escritorio = null; // escritorio al que es asignado
    this.agente = null; // agente a quien se le ha asignado
  }
}

module.exports = Ticket;
