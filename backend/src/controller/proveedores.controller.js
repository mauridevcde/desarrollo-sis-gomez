import { pool } from "../db.js";

export const getproveedores = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM db_proveedores where Estado = 1"
    );
    console.log(rows);
    res.json(rows); //devuelve un json
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ msg: "Error en el servidor" });
  }
};

export const getproveedoresById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM db_proveedores WHERE id = ? and Estado = 1",
      [id]
    );
    console.log(rows);

    if (rows.length <= 0) {
      return res.status(404).json({ msg: "No existe el proveedor" });
    }
    res.json(rows[0]); //devuelve un json
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ msg: "Error en el servidor" });
  }
};

export const postproveedores = async (req, res) => {
  const { RazonSocial, NroTelef, Ruc, Direccion, Estado } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO db_proveedores (RazonSocial, NroTelef, Ruc, Direccion, Estado ) VALUES (?,?,?,?,?)",
      [RazonSocial, NroTelef, Ruc, Direccion, Estado]
    );
    res.send({
      id: rows.insertId,
      RazonSocial,
      NroTelef,
      Ruc,
      Direccion,
      Estado,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ msg: "Error en el servidor" });
  }
};

export const putproveedores = async (req, res) => {
  //consultar si el fontend va a necesitar por el params o por el body.
  const { id } = req.params;
  const { RazonSocial, NroTelef, Ruc, Direccion, Estado } = req.body;
  console.log(id);
  try {
    const [result] = await pool.query(
      "UPDATE db_proveedores SET RazonSocial = IFNULL(?, RazonSocial) , NroTelef = IFNULL(?, NroTelef), Ruc = IFNULL(?, Ruc), Direccion = IFNULL(?, Direccion),Estado = IFNULL(?, Estado) WHERE id = ?",
      [RazonSocial, NroTelef, Ruc, Direccion, Estado, id]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({ msg: "No existe el proveedor" });
    }
    // ahora si existe el proveedor y se actualizo correctamente llamamos a la base de datos para que nos devuelva el proveedor actualizado
    const [rows] = await pool.query(
      "SELECT * FROM db_proveedores WHERE id = ?",
      [id]
    );
    console.log(rows);
    res.json(rows[0]); //devuelve un json
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ msg: "Error en el servidor" });
  }
};

export const deleteproveedores = async (req, res) => {
  //consultar si el fontend va a necesitar por el params o por el body.
  const { id } = req.params;

  console.log(id);

  try {
    const [result] = await pool.query(
      "UPDATE db_proveedores SET Estado = 0 WHERE id = ?",
      [id]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({ msg: "No existe el proveedor" });
    }
    
    res.status(200).json({ msg: "Eliminado con Exito" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ msg: "Error en el servidor" });
  }
};
