require('dotenv');
const app = require('express')();
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const port = process.env.PORT || 4000;
const index = require('./routes');
app.use(index);
const server = http.createServer(app);
const io = socketIo(server); // Ao fazer isso, conectamos o servidor ExpressJS ao Socket.IO.

io.on('connection', socket => {
    console.log(`New client connected`), setInterval(
        () => getAPIData(socket), 1000);
    socket.on('disconnect', () => console.log('Client disconnected'));
});

const getAPIData = async socket => {
    try {
        let responseAPI = await axios.get(
            `https://api.darksky.net/forecast/YOUR_API_KEY/37.8267,-122.4233`
        );
        socket.emit('FromAPI', responseAPI.data.currently.temperature)
    } catch (e) {
        console.error(`Error: ${e}`);
    }
};


server.listen(port, (err) => {
    (err) ? console.error(`Server error : ${err}`) : console.log(`Server running  - PORT : ${port}`);
});