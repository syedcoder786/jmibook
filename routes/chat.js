const express = require('express');
const router = express.Router();
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');


const server = http.createServer(app);
const io = socketio(server, {
    cors:{
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

io.on("connection",(socket) => {
    console.log("Socket connected")

    socket.on("chat", (payload) => {
        console.log("Payload:",payload)
        io.emit("chat", payload)
    })
})