import axios from "../axios";

export const loginRequest = async (data) => {
  return await axios.post("auth/login", {
    Usuario: data.Usuario,
    password: data.pass,
  });
};
