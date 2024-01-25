import express from 'express';
import {
  deleteProduct,
  getProduct,
  setProduct,
  updateProduct
} from '../controllers/products.controller.js';
import { auth } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/products', async (req, res) => {
  try {
    const productList = await getProduct();
    //console.log(productList);
    res.status(200).json({ success: true, body: JSON.parse(productList) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/save', async (req, res) => {
  try {
    //console.log(req.body);
    await setProduct(req.body);
    res
      .status(200)
      .json({ success: true, message: 'Successfully Added', body: req.body });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
});

router.patch('/update', async (req, res) => {
  try {
    //console.log(req.body);
    const product = await updateProduct(req.body);
    res.status(200).json({
      success: true,
      message: 'Successfully Updated',
      body: product[0]
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
});

router.delete('/delete/:id', auth, async (req, res) => {
  try {
    //console.log(req.params.id);
    const product = await deleteProduct(req.params);
    res.status(200).json({
      success: true,
      message: 'Successfully deleted',
      body: product[0]
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
});

export default router;
