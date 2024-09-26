import axios from "../axios";

export const registerNew = async (datos) => {
  return await axios.post("auth/register", {
    Nombre: datos.Nombre,
    Usuario: datos.Usuario,
    password: datos.password,
    FechaNac: datos.FechaNac,
    Sexo: datos.sexo.value,
    Activo: true,
    VenderHasta: "liberado",
    StockInsuficiente: "liberado",
  });
};
