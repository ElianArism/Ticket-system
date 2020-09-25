let socket = io(); 
// Obtener el control de la url 
let searchParams = new URLSearchParams(window.location.search)
// console.log(searchParams);

// Si en la url no existe el query param escritorio 
if(!searchParams.has('escritorio')) { 
    // Redirecciona al index  
    window.location = 'index.html'; 
    throw new Error('El escritorio es necesario.'); 
}

let escritorio = searchParams.get('escritorio'); 
document.getElementById('escritorio').textContent = `Escritorio: ${escritorio}`;

const btn = document.querySelector('.btn'); 
btn.addEventListener('click', (e) => {
    e.preventDefault(); 
    socket.emit('atenderTicket', {escritorio:escritorio} ,(res) => {
        document.querySelector('small').textContent = res[0].nro;
        if(res[0].nro === undefined) document.querySelector('small').textContent = res;
    }); 
});

