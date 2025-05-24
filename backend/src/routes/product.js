import { Router } from 'express';
import { createProduct, deleteProduct, updateProduct, getAllProducts } from '../controllers/product.js';

const router = Router();

router.get('/', getAllProducts);

router.post('/', createProduct);

router.delete('/:id', deleteProduct);

router.patch('/:id', updateProduct);

export default router;
