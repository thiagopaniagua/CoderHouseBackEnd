import express from 'express';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';
import { ProductManager } from './ProductManager.js';

const app = express();
const port = 8080;
const productos = new ProductManager();

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.get('/products', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || undefined;
    const products = await productos.getProducts();
    if (limit !== undefined) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productos.getProductsById(id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
