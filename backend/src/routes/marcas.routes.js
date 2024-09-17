import { Router } from "express";
import {
  deletemarcas,
  getmarcas,
  getmarcasById,
  postmarcas,
  putmarcas,
} from "../controller/marcas.controller.js";
const marcas = Router();

marcas.get("/marcas", getmarcas);

marcas.get("/marcas/:id", getmarcasById);

marcas.post("/marcas", postmarcas);

marcas.put("/editarmarcas/:id", putmarcas);

marcas.put("/deletemarcas/:id", deletemarcas);

export default marcas;
