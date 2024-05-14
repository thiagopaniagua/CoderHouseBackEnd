import express, { urlencoded } from 'express';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';
import viewsRouter from './routes/views.js';
import socketHandler from './routes/socket.js';
import { engine } from 'express-handlebars';
import __dirname from './utils.js';
import * as path from 'path';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

const app = express();
const port = 8080;

const server = createServer(app);
const io = new SocketIOServer(server);

app.use(express.json());
app.use(urlencoded({ extended: true }));

// API
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Views
app.use('/', viewsRouter);

// Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname + '/views'));

// CSS
app.use('/', express.static(__dirname + '/public'));

// Socket.io
socketHandler(io);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

