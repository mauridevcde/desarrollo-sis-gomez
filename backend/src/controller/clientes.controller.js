import { pool } from "../db.js";

export const getClientes = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM db_clientes where Estado = 1"
    );
    console.log(rows);
    res.json(rows); //devuelve un json
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ msg: "Error en el servidor" });
  }
};

export const getClientesById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM db_clientes WHERE id_Clientes = ? and Estado = 1",
      [id]
    );
    console.log(rows);

    if (rows.length <= 0) {
      return res.status(404).json({ msg: "No existe el cliente" });
    }
    res.json(rows[0]); //devuelve un json
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ msg: "Error en el servidor" });
  }
};

export const postClientes = async (req, res) => {
  const {
    Nombre,
    Apellido,
    CiNro,
    Ruc,
    NroTelef,
    FechaNac,
    Direccion,
    Estado,
  } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO db_clientes (Nombre, Apellido, CiNro, Ruc, NroTelef, FechaNac, Direccion, Estado) VALUES (?, ?,?, ?,?, ?,?,?)",
      [Nombre, Apellido, CiNro, Ruc, NroTelef, FechaNac, Direccion, Estado]
    );
    res.send({
      id: rows.insertId,
      Nombre,
      Apellido,
      CiNro,
      Ruc,
      NroTelef,
      FechaNac,
      Direccion,
      Estado,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ msg: "Error en el servidor" });
  }
};

export const putClientes = async (req, res) => {
  //consultar si el fontend va a necesitar por el params o por el body.
  const { id } = req.params;
  const {
    Nombre,
    Apellido,
    CiNro,
    Ruc,
    NroTelef,
    FechaNac,
    Direccion,
    Estado,
  } = req.body;
  console.log(id);
  try {
    const [result] = await pool.query(
      "UPDATE db_clientes SET Nombre = IFNULL(?, Nombre) , Apellido = IFNULL(?, Apellido), CiNro = IFNULL(?, CiNro), Ruc = IFNULL(?, Ruc), NroTelef = IFNULL(?, NroTelef), FechaNac = IFNULL(?, FechaNac), Direccion = IFNULL(?, Direccion), Estado = IFNULL(?, Estado) WHERE id_Clientes = ?",
      [Nombre, Apellido, CiNro, Ruc, NroTelef, FechaNac, Direccion, Estado, id]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({ msg: "No existe el cliente" });
    }
    // ahora si existe el cliente y se actualizo correctamente llamamos a la base de datos para que nos devuelva el cliente actualizado
    const [rows] = await pool.query(
      "SELECT * FROM db_clientes WHERE id_Clientes = ?",
      [id]
    );
    console.log(rows);
    res.json(rows[0]); //devuelve un json
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ msg: "Error en el servidor" });
  }
};

// export const deleteCLientes = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const [rows] = await pool.query(
//       "DELETE FROM clientes WHERE idCliente = ?",
//       [id]
//     );
//     console.log(rows);
//     if (rows.affectedRows <= 0) {
//       return res.status(404).json({ msg: "No existe el cliente" });
//     }
//     res.send.status(204);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500).json({ msg: "Error en el servidor" });
//   }
// };
export const deleteCLientes = async (req, res) => {
  //consultar si el fontend va a necesitar por el params o por el body.
  const { id } = req.params;

  console.log(id);

  try {
    const [result] = await pool.query(
      "UPDATE db_clientes SET Estado = 0 WHERE id_Clientes = ?",
      [id]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({ msg: "No existe el cliente" });
    }
    // ahora si existe el cliente y se actualizo correctamente llamamos a la base de datos para que nos devuelva el cliente actualizado
    const [rows] = await pool.query(
      "SELECT * FROM db_clientes WHERE id_Clientes = ?",
      [id]
    );
    res.status(200).json({ msg: "Cliente Eliminado con Exito" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ msg: "Error en el servidor" });
  }
};
