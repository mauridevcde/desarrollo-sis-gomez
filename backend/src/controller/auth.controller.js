import { pool } from "../db.js";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const verifyUserExists = async (usuario) => {
  const [rows] = await pool.query(
    "SELECT * FROM db_usuarios where Usuario = ?",
    [usuario]
  );
  if ((await rows[0]) == undefined) {
    return false;
  } else {
    return true;
  }
};

export const postregister = async (req, res) => {
  // Manejamos los datos que vienen desde el body.
  const {
    Nombre,
    Usuario,
    password,
    FechaNac,
    Sexo,
    Activo,
    VenderHasta,
    StockInsuficiente,
    id_permiso,
  } = req.body;
  const verify = await verifyUserExists(Usuario);

  try {
    //verificar si existe o no el usuario.
    if (verify == true) {
      res.json({ msg: "El usuario ya se encuentra registrado" });
      return;
    }
    //procede a crear el usuario.

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.saltRounds)
    );

    const [rows] = await pool.query(
      "INSERT INTO db_usuarios ( Nombre, Usuario, password,FechaNac,Sexo,Activo,VenderHasta,StockInsuficiente,id_permiso ) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        Nombre,
        Usuario,
        hashedPassword,
        FechaNac,
        Sexo,
        Activo,
        VenderHasta,
        StockInsuficiente,
        id_permiso,
      ]
    );
    res.json({ msg: "Usuario Registrado con exito" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ msg: "Error en el servidor" });
  }
};

export const login = async (req, res) => {
  const { Usuario, password } = req.body;

  //si existe el usuario.
  const [user] = await pool.query(
    "SELECT * FROM db_usuarios where Usuario = ?",
    [Usuario]
  );

  if (user[0] == undefined) return res.json({ msg: "usuario no existe" });

  //consulta sobre el usuario y la contraseña
  const hashedpassword = user[0].password;
  const decryptPass = await bcrypt.compare(password, hashedpassword);

  if (!decryptPass) return res.json({ msg: "usuario o contraseña incorrecta" });

  const {
    id,
    Nombre,
    Usuario: userResponse,
    FechaNac,
    Sexo,
    Activo,
    VenderHasta,
    StockInsuficiente,
    id_permiso,
  } = user[0];
  // res.json({
  //   id,
  //   Nombre,
  //   Usuario: userResponse,
  //   FechaNac,
  //   Sexo,
  //   Activo,
  //   VenderHasta,
  //   StockInsuficiente,
  //   id_permiso,
  // });
  // console.log(decryptPass);
  const token = jwt.sign(
    {
      id,
      Nombre,
      Usuario: userResponse,
      FechaNac,
      Sexo,
      Activo,
      VenderHasta,
      StockInsuficiente,
      id_permiso,
    },
    process.env.SecretJWT,
    {
      expiresIn: "2h",
    }
  );

  res.cookie("access_token", token, { maxAge: 1000 * 60 * 60 }).send({msg: 'ok'})
};
