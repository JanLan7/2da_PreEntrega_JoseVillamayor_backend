import { Router } from 'express';
import productManager from '../managers/ProductManager.js';

const router = Router();

router.get('/', (req, res) => {
    const products = productManager.getProducts();
    res.render('index', { products });
});

router.get('/realtimeproducts', (req, res) => {
    const products = productManager.getProducts();
    res.render('realTimeProducts', { products });
});

export default router;

