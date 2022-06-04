const socket = io("http://localhost:8000")
const form = document.getElementById("messanger");
const messageInput = document.getElementById("writter");
const messageContainer = document.getElementById("main");

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageElement.classList.add('chat');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, "chat1");
    socket.emit('send', message);
    messageInput.value = '';
})

const name = prompt('Please enter your name');
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name}: joined the chat`, 'chat2')
});
socket.on('recieve', data => {
    append(`${data.name}:${data.message}`, 'chat2')
});
socket.on('left', data => {
    append(`${name}: left the chat`, 'chat2')
});