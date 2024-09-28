import { Router } from "express";
import {
  deleteproductos,
  getproductos,
  getproductosById,
  postproductos,
  putproductos,
} from "../controller/productos.controller.js";
const productos = Router();

productos.get("/productos", getproductos);

productos.get("/productos/:id", getproductosById);

productos.post("/productos", postproductos);

productos.put("/editarproductos/:id", putproductos);

productos.put("/deleteproductos/:id", deleteproductos);

export default productos;