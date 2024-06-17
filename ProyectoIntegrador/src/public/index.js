const socket = io();

let username = null;

if (!username) {
  Swal.fire({
    title: "¡Bienvenido!",
    input: "Por favor ingresa tu nombre",
    input: "text",
    showCancelButton: true,
    inputValidator: (value) => {
      if (!value) {
        return "¡El nombre de usuario es requerido!";
      }
    }
  }).then((input) => {
    username = input.value;
    socket.emit('newUser', username);
  });
}

const message = document.getElementById('message');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const actions = document.getElementById('actions');

btn.addEventListener('click', () => {
  socket.emit('chat:message', {
    user: username,  
    message: message.value
  });
  message.value = '';
});

socket.on('messages', (data) => {
  actions.innerHTML = '';
  const chatRender = data.map((msg) => {
    return `<p><strong>${msg.user}</strong>: ${msg.message}</p>`; 
  }).join(' ');

  output.innerHTML = chatRender;
});

socket.on('newUser', (username) => {
  Toastify({
    text: `${username} ha iniciado sesión`,
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function() {} // Callback after click
  }).showToast();
});

message.addEventListener('keypress', () => {
  socket.emit('chat:typing', username);
});

socket.on('chat:typing', (data) => {
  actions.innerHTML = `<h3>${data}</h3>
  <p>Esta escribiendo...</p>`;
});
