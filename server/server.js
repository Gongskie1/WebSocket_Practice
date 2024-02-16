const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const {WebSocketServer} = require("ws");
const uuidv4 = require("uuid").v4
const wsServer = new WebSocketServer({server});
const url = require("url");
const port = 8080;

const connections = { };
const users = { }


const broadcastUsers = () =>{
    Object.keys(connections).forEach( uuid => {
        const connection = connections[uuid]
        const message = JSON.stringify(users);
        // console.log("broadcast: ",connection);
        connection.send(message)
    })
}

const handleMessage = (bytes, uuid) =>{
    const message = JSON.parse(bytes.toString());
    const user = users[uuid];
    // console.log(user)
    user.state = message
    
    broadcastUsers()
    console.log(`${user.username} updated their state: ${JSON.stringify(user.state)}`)
    // console.log("Tang ina yawa",users)
}

const handleChange = (uuid) =>{
    console.log(`${users.username} disconnected`);
    delete connections[uuid];
    delete users[uuid]

    broadcastUsers();
}

wsServer.on("connection", (connection,request)=>{

    const { username } = url.parse(request.url, true).query
    const uuid = uuidv4();

    connections[uuid] = connection
    
    // console.log(connections);
    // console.log(connections);

    users[uuid] = {
        username:username,
        state: {
            x:0,
            y:0
        }
    }
    // console.log(users)

    connection.on("message", (message) => handleMessage(message, uuid));
    connection.on("close", (uuid) => handleChange(uuid));
});

server.listen(port, function () {
    console.log(`Server running on port: ${port}`);
});
