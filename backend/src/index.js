import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import auth from "./routes/auth.routes.js";
import clientes from "./routes/clientes.routes.js";
import proveedores from "./routes/proveedores.routes.js";
import categorias from "./routes/categorias.routes.js";
import marcas from "./routes/marcas.routes.js";
import { VerifyAuthentication } from "./middleware/requireAuth.js";
import { PORT } from "./config.js";
import productos from "./routes/productos.routes.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, 
  allowedHeaders: ["Content-Type", "Authorization"], // Permitir solo estos encabezados
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/auth", auth);
app.use("/api", VerifyAuthentication, proveedores);
app.use("/api", VerifyAuthentication, categorias);
app.use("/api", VerifyAuthentication,marcas);
app.use("/api", VerifyAuthentication, productos);
app.use("/api", VerifyAuthentication, clientes);

app.listen(PORT);
console.log(`Server corriendo en el puerto ${PORT}`);
