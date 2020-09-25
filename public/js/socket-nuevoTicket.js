let socket = io(); 
const btnGenerarTicket = document.querySelector('#generarTicket'); 

// Listeners
btnGenerarTicket.addEventListener('click', siguienteTicket);
document.addEventListener('DOMContentLoaded', cargarUltimoTicket)


// Realiza una peticion para obtener el siguiente ticket 
function siguienteTicket() {    
    // Emit siguiente ticket
    socket.emit('siguienteTicket', (ticket) => {
        console.log(ticket);
        insertarTicket(ticket.res); 

    });   
}

// Se ejecuta al recien cargar la pagina y escucha el ultimo ticket generado
function cargarUltimoTicket() {
    // on 'estadoActual'
    socket.on('estadoActual', (res) => {
        insertarTicket(res.actual); 
    });    
}

// Insertar ticket en  html 
function insertarTicket(ticket) {
    const labeltk = document.getElementById('lblNuevoTicket'); 
    labeltk.innerHTML = ticket; 

}
