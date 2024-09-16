import dotenv from 'dotenv'
dotenv.config()

import express from "express";
import clientes from "./routes/clientes.routes.js";

const app = express();

app.use(express.json());

app.use("/api", clientes);

app.use((req, res, next) => {
  res.status(404).json({ msg: "Not Found" });
});

app.listen(process.env.SecretPort); 
console.log(`Server corriendo en el puerto ${process.env.SecretPort}`);
