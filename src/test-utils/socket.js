import io from 'socket.io-client';
// const socket = io('http://54.190.192.105:5031/');
const socket = io('http://54.190.192.105:6132');
console.log('TUSHARRRRR', socket);
socket.on('connect', function () {
  console.log('********SOCKET CONNECTED*******', socket);
});

socket.on('connect_error', (err) => {
  console.log(`connect_error due to ${err.message}`);
});

socket.on('create_room', (data) => {
  console.log('*********ROOM_CREATED******', data);
});

export default socket;
