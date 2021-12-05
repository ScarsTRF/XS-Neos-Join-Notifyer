const dgram = require('dgram');
const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');
//require('dotenv').config();

const PORT = process.env.PORT || 3700;
const INDEX = path.join(__dirname, 'index.html');
const server = express()
    .use((req, res) => res.sendFile(INDEX))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));
const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('message', function incoming(message) {
        var ip = String(ws._socket.remoteAddress);
        ip = ip.split('::ffff:').pop();

        let json = JSON.stringify({
            "messageType": 1,
            "index": 0,
            "timeout": 3,
            "height": 135,
            "opacity": 1,
            "volume": 0.5,
            "audioPath": "default",
            "useBase64Icon": false,
            "icon": "",
            "sourceApp": "XSOverlayNeosJoinNotif",
        
            "title": message.toString(),
            //"content": "Welcome to Neos or something~",
        });
        
        let toSend = json.toString("base64");
        let server = dgram.createSocket('udp4');
        server.send(toSend, 42069, ip, function () {
            server.close();
        });
    });
})