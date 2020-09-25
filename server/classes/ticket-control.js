const fs = require('fs');

class Ticket { 
    constructor(nro, escritorio) { 
        this.nro = nro; 
        this.escritorio = escritorio; 
    } 
}


class TicketControl { 
    constructor() { 
        this.ultimo = 0;
        this.hoy = new Date().getDate(); 
        this.ticketsPendientes = [];  
        this.ultimos4Tickets = []; 
        let data = require('../data/data.json');
        if (this.hoy === data.hoy) {
            
            this.ultimo = data.ultimo; 
            this.ticketsPendientes = data.ticketsPendientes;
            this.ultimos4Tickets = data.ultimos4Tickets; 
         
        } else {
            this.reiniciarConteo(); 
        }
    }
    
    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null); 
        this.ticketsPendientes.push(ticket); 
        
        this.grabarArchivo(); 
        return `ticket ${this.ultimo}`;
    
    }

    reiniciarConteo() { 
        this.ultimo = 0; 
        this.ticketsPendientes = []; 
        this.ultimos4Tickets = []; 
    }
    
    grabarArchivo() { 
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy, 
            ticketsPendientes: this.ticketsPendientes, 
            ultimos4Tickets: this.ultimos4Tickets
        }

        let jsonStr =  JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonStr); 
        
    }
 
    get UltimoTicket() { 
        return `Ticket: ${this.ultimo}`; 
    }
    get Ultimos4Tickets() { 
        return this.Ultimos4Tickets;
    }

    atenderTicket(escritorio) { 
        if(this.ticketsPendientes.length < 1) return 'No hay tickets'; 
        
        // asigna primer elemento y luego lo elimina de la lista ticketsPendientes
        let numeroTicket = this.ticketsPendientes[0].nro; 
        this.ticketsPendientes.shift();

        // crea una nueva instancia de ticket con el escritorio y la agrega en el primer index del array.
        let atenderTicket = new Ticket(numeroTicket, escritorio);
        this.ultimos4Tickets.unshift(atenderTicket); 
        if(this.ultimos4Tickets.length > 4) this.ultimos4Tickets.splice(-1, 1); // Borra el ultimo elemento del array.  
        this.grabarArchivo();
        return this.ultimos4Tickets;
    }

    
}

module.exports = {TicketControl};