import { Router } from "express";
import { deleteproveedores, getproveedores, getproveedoresById, postproveedores, putproveedores } from "../controller/proveedores.controller.js";
const proveedores = Router();

proveedores.get("/proveedores", getproveedores );

proveedores.get('/proveedores/:id', getproveedoresById );

proveedores.post('/proveedores', postproveedores);

proveedores.put('/editarproveedores/:id', putproveedores);

proveedores.put('/deleteproveedores/:id', deleteproveedores);

export default proveedores;
