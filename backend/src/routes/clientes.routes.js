import { Router } from "express";
import { deleteCLientes, getClientes, getClientesById, postClientes, putClientes } from "../controller/clientes.controller.js";
const clientes = Router();

clientes.get("/clientes", getClientes );

clientes.get('/clientes/:id', getClientesById );

clientes.post('/clientes', postClientes);

clientes.put('/editarclientes/:id', putClientes);

clientes.put('/deleteClientes/:id', deleteCLientes);

export default clientes;
