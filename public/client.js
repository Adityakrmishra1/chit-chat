const socket = io();

let name;
let textarea = document.getElementById('textarea');
let message_area = document.querySelector('.message__area');

do {
	name = prompt("Please enter your name...");
}
while (!name);

textarea.addEventListener('keyup', (e) => {
	if (e.key === 'Enter') {
		sendmessage(e.target.value);
	}
});


function sendmessage(m) {
	let msg = {
		user: name,
		message: m.trim()
	}

	//apend
	textarea.value = "";
	appendMessage(msg, 'outgoing');
	scroll();

	// sending to server using web-scoket...

	socket.emit('message', msg);
};

function appendMessage(msg, type) {
	let maindiv = document.createElement('div');
	maindiv.classList.add('message', type);

	let markup = `
	<h4>${msg.user}</h4>
	<p>${msg.message}</p>
	`;
	maindiv.innerHTML = markup;
	message_area.appendChild(maindiv);
};



// receving all messages ...

socket.on('message', (msg) => {
	console.log(msg);

	appendMessage(msg, 'incoming');
	scroll();

});

function scroll() {
	message_area.scrollTop = message_area.scrollHeight;
}