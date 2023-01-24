import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

//Router
import router from './routes/index.js'

const server = express();

server.use(cors());
server.use(express.json());

server.get("/health", (req, res) => {
    return res.sendStatus(200);
})

server.use(router);

server.listen(process.env.PORT, () => {
    console.log('Servidor executando na porta ' + process.env.PORT);
})
