import { ProductManager } from '../ProductManager.js';

const productos = new ProductManager();

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('nuevoProducto', async (producto) => {
      try {
        await productos.addProduct(
          producto.title,
          producto.description,
          producto.code,
          producto.price,
          producto.status,
          producto.stock,
          producto.category,
          producto.thumbnails
        );
        const productosActualizados = await productos.getProducts();
        io.emit('actualizarProductos', productosActualizados);
      } catch (error) {
        console.error(error);
      }
    });

    socket.on('eliminarProducto', async (id) => {
      try {
        await productos.deleteProductsById(id);
        const productosActualizados = await productos.getProducts();
        io.emit('actualizarProductos', productosActualizados);
      } catch (error) {
        console.error(error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });
};

export default socketHandler;
