import dotenv from "dotenv";
dotenv.config();

import express from "express";
import clientes from "./routes/clientes.routes.js";
import proveedores from "./routes/proveedores.routes.js";
import categorias from "./routes/categorias.routes.js";
import marcas from "./routes/marcas.routes.js";

const app = express();

app.use(express.json());

app.use("/api", clientes);
app.use("/api", proveedores);
app.use("/api", categorias);
app.use("/api", marcas);


app.listen(process.env.SecretPort);
console.log(`Server corriendo en el puerto ${process.env.SecretPort}`);
