import express from "express";
import { Router } from "./routes.js"
import cors from "cors"
import 'dotenv/config'

const app = express();
app.use(express.json());
app.use(cors());
app.use(Router);
app.use((req, res, next) => {
    res.status(200).send({
        mensagem: 'Testando'
    });
});

export { app };