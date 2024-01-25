import express from 'express';
import productsRouter from './routers/products.router.js';
import userRouter from './routers/user.router.js';
export const server = express();

server.use(express.json());
server.use('/', productsRouter);
server.use('/user/', userRouter);

server.get('/', (req, res) => {
  res.json({ success: true, message: 'api working ok' });
});

// ! Get Post, Put Delete, Validacion de datos, autenticacion, jsonwebtoken
