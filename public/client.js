const socket = io();
let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');

do {
    name = prompt('Please enter your name: ');
} while (!name);

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
        sendMessage(e.target.value);
    }
});

// Auto-resize textarea to fit content
textarea.addEventListener('input', () => {
    textarea.style.height = 'auto'; // Reset height to auto
    textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height to fit content
});

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    };
    // Append 
    appendMessage(msg, 'outgoing');
    textarea.value = '';
    textarea.style.height = 'auto'; // Reset textarea height after sending message
    scrollToBottom();

    // Send to server 
    socket.emit('message', msg);
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
        <h4 style="margin:20px;">${msg.user}</h4>
        <p>${msg.message}</p>
    `;
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}

// Receive messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom();
});

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}

// Ensure the chat area grows with the window size
window.addEventListener('resize', () => {
    scrollToBottom();
});
