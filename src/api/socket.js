import socketIO from 'socket.io-client';

let socket = null;
export default function() {
  socket = socketIO('http://localhost:8080/websocket');
  socket.on('connect', function(){
    console.log("connected to web socket");
  });
}
