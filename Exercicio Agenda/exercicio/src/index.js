import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import conexao from './repository/connection.js';
import endpoints from './controller/rotas.js';

const server = express()
server.use(cors());
server.use(express.json());
server.use(endpoints)

server.listen(process.env.PORT, () => console.log('API online na porta ' + process.env.PORT))