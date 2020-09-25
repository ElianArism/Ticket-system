let socket = io(); 

let lblTickets = [
    document.querySelector('#lblTicket1'),
    document.querySelector('#lblTicket2'),
    document.querySelector('#lblTicket3'),
    document.querySelector('#lblTicket4')
]; 

let lblEsc = [
    document.querySelector('#lblEscritorio1'),
    document.querySelector('#lblEscritorio2'),
    document.querySelector('#lblEscritorio3'),
    document.querySelector('#lblEscritorio4')
]; 

socket.on('estadoActual', function (res) {
    actualizarHTML(res.ultimos4Tickets); 
}); 

socket.on('ultimos4Tickets', function(res) {
    let audio = new Audio('audio/new-ticket.mp3');
    audio.addEventListener("canplaythrough", event => {
       audio.play();
    });
    actualizarHTML(res.ultimos4Tickets);  
});


function actualizarHTML(tickets) {
    tickets.forEach((ticket, i) => {
        lblEsc[i].textContent = `Escritorio: ${ticket.escritorio}`; 
        lblTickets[i].textContent = `Ticket: ${ticket.nro}`;
    });
}