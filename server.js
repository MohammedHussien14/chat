const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let connectedUsers = 0;

io.on("connection", (socket) => {
    if (connectedUsers >= 2) {
        socket.emit("full", "Only 2 users allowed.");
        socket.disconnect(true);
        return;
    }

    connectedUsers++;
    console.log("A user connected:", socket.id);

    socket.on("chat message", (msg) => {
        socket.broadcast.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        connectedUsers--;
        console.log("User disconnected:", socket.id);
    });
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
