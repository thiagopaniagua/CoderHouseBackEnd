import express, { urlencoded } from 'express';
import productsRouter from './Routes/product.router.js';
import cartsRouter from './Routes/cart.router.js';
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './Routes/views.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
//import { ProductManager } from './Managers/ProductManager.js';
//import MessageManager from './Managers/MessagesManager.js';
import * as messageManager from './services/message.services.js';
import chatRouter from './routes/chat.js';
import { initMongoDB } from './dao/mongodb/connection.js'
import * as services from './services/product.services.js'



//express
const app = express();
const port = 8080;
const httpServer = createServer(app);
const io = new Server(httpServer);


 initMongoDB();


//Managers
//const productManager = new ProductManager();
//const messageManager = new MessageManager(`${__dirname}/db/messages.json`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);
app.use('/chat', chatRouter);

//socket.io
io.on('connection', async (socket) => {
    console.log(`New connection`, socket.id);
    io.emit('messages', await messageManager.getAll());

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    }); 

    socket.on('newUser', (user) => {
        console.log(`${user} ha iniciado sesion`);
        socket.broadcast.emit('newUser', user);
    });

    socket.on('chat:message', async (msg) => {
     
      if (msg.user && msg.message) {
        await messageManager.create({ user: msg.user, message: msg.message });
        io.emit('messages', await messageManager.getAll());
      } else {
        console.error('Invalid message format', msg);
      }
    });
    

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    });
});

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('newProduct', async (data) => {
        try {
            const newProduct = await services.create(data);
            const products = await services.getAll();
            io.emit('updateProducts', products);
        } catch (error) {
            console.error('Error al agregar producto:', error.message);
        }
    });

    socket.on('deleteProduct', async (productId) => {
        try {
            await services.remove(productId);
            const products = await services.getAll();
            io.emit('updateProducts', products);
        } catch (error) {
            console.error('Error al eliminar producto:', error.message);
        }
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

// Start server
httpServer.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
