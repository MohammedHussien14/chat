const socket = io();

socket.on("full", (msg) => {
    alert(msg);
});

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

form.addEventListener("submit", function(e) {
    e.preventDefault();
    if (input.value) {
        const item = document.createElement("li");
        item.textContent = "You: " + input.value;
        messages.appendChild(item);
        socket.emit("chat message", input.value);
        input.value = "";
    }
});

socket.on("chat message", function(msg) {
    const item = document.createElement("li");
    item.textContent = "Stranger: " + msg;
    messages.appendChild(item);
});
