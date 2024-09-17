import { pool } from "../db.js";

export const getmarcas = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM db_marca where Estado = 1"
    );
    console.log(rows);
    res.json(rows); //devuelve un json
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ msg: "Error en el servidor" });
  }
};

export const getmarcasById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM db_marca WHERE id = ? and Estado = 1",
      [id]
    );
    console.log(rows);

    if (rows.length <= 0) {
      return res.status(404).json({ msg: "No existe la marca" });
    }
    res.json(rows[0]); //devuelve un json
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ msg: "Error en el servidor" });
  }
};

export const postmarcas = async (req, res) => {
  const { Descripcion, Estado } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO db_marca (Descripcion, Estado ) VALUES (?,?)",
      [Descripcion, Estado]
    );
    res.send({
      id: rows.insertId,
      Descripcion,
      Estado,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ msg: "Error en el servidor" });
  }
};

export const putmarcas = async (req, res) => {
  //consultar si el fontend va a necesitar por el params o por el body.
  const { id } = req.params;
  const { Descripcion, Estado } = req.body;
  console.log(id);
  try {
    const [result] = await pool.query(
      "UPDATE db_marca SET Descripcion = IFNULL(?, Descripcion) ,Estado = IFNULL(?, Estado) WHERE id = ?",
      [Descripcion, Estado, id]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({ msg: "No existe la marca" });
    }
    // ahora si existe la marca y se actualizo correctamente llamamos a la base de datos para que nos devuelva la marca actualizado
    const [rows] = await pool.query("SELECT * FROM db_marca WHERE id = ?", [
      id,
    ]);
    console.log(rows);
    res.json(rows[0]); //devuelve un json
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ msg: "Error en el servidor" });
  }
};

export const deletemarcas = async (req, res) => {
  //consultar si el fontend va a necesitar por el params o por el body.
  const { id } = req.params;

  console.log(id);

  try {
    const [result] = await pool.query(
      "UPDATE db_marca SET Estado = 0 WHERE id = ?",
      [id]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({ msg: "No existe la marca" });
    }

    res.status(200).json({ msg: "Eliminado con Exito" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ msg: "Error en el servidor" });
  }
};
