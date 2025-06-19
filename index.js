const WebSocket = require('ws');

const PORT = process.env.PORT || 3000;

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', (ws) => {
  console.log('Jugador conectado');

  ws.send('Hola desde Mega Legends server!');

  ws.on('message', (message) => {
    console.log('Mensaje recibido:', message);

    // Reenvía el mensaje a todos los demás clientes conectados
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Jugador desconectado');
  });
});

console.log(`Servidor WebSocket corriendo en puerto ${PORT}`);