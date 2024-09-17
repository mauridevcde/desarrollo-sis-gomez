import { Router } from "express";
import {
  deletecategorias,
  getcategorias,
  getcategoriasById,
  postcategorias,
  putcategorias,
} from "../controller/categorias.controller.js";
const categorias = Router();

categorias.get("/categorias", getcategorias);

categorias.get("/categorias/:id", getcategoriasById);

categorias.post("/categorias", postcategorias);

categorias.put("/editarcategorias/:id", putcategorias);

categorias.put("/deletecategorias/:id", deletecategorias);

export default categorias;
