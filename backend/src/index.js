import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import auth from "./routes/auth.routes.js";
import clientes from "./routes/clientes.routes.js";
import proveedores from "./routes/proveedores.routes.js";
import categorias from "./routes/categorias.routes.js";
import marcas from "./routes/marcas.routes.js";
import { VerifyAuthentication } from "./middleware/requireAuth.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use("/auth", auth);
app.use("/api", VerifyAuthentication ,clientes);
app.use("/api", proveedores);
app.use("/api", categorias);
app.use("/api", marcas);

app.listen(process.env.SecretPort);
console.log(`Server corriendo en el puerto ${process.env.SecretPort}`);
