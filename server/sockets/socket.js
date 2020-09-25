const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control'); 
const tk = new TicketControl(); 

io.on('connection', (client) => {
    client.on('siguienteTicket', (callback) => { 
        callback({
            res: tk.siguiente() 
        }); 
    }); 

    client.emit('estadoActual', {
        actual: tk.UltimoTicket, 
        ultimos4Tickets: tk.ultimos4Tickets
    }); 
 
    client.on('atenderTicket', (data, callback) => { 
        if(!data.escritorio) return callback({err: true, msg: 'El escritorio es obligatorio.'}); 
        let atenderTicket = tk.atenderTicket( data.escritorio );
        callback(atenderTicket); 
        
    });
   
    
});