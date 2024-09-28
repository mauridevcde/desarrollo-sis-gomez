import { pool } from "../db.js";

export const getproductos = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM db_productos where Estado = 1"
    );
    console.log(rows);
    res.json(rows); //devuelve un json
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ msg: "Error en el servidor" });
  }
};

export const getproductosById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM db_productos WHERE id = ? and Estado = 1",
      [id]
    );
    console.log(rows);

    if (rows.length <= 0) {
      return res.status(404).json({ msg: "No existe el producto" });
    }
    res.json(rows[0]); //devuelve un json
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ msg: "Error en el servidor" });
  }
};

export const postproductos = async (req, res) => {
  const {
    Descripcion,
    PrecioCompra,
    PrecioVenta,
    Stock,
    FechaDeVencimiento,
    ImagenDelProducto,
    CodigoDeBarra,
    Id_Proveedor,
    Id_Marca,
    Id_Categoria,
    CodigoProducto,
    Iva,
    PrecioMayorista,
    StockMinimo,
    Estado,
    CostoMedio,
    id_usuario_Producto,
    Saldo,
  } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO db_productos (Descripcion, PrecioCompra,PrecioVenta,Stock,FechaDeVencimiento,ImagenDelProducto,CodigoDeBarra,Id_Proveedor,Id_Marca,Id_Categoria,CodigoProducto,Iva,PrecioMayorista,StockMinimo,Estado,CostoMedio,id_usuario_Producto,Saldo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        Descripcion,
        PrecioCompra,
        PrecioVenta,
        Stock,
        FechaDeVencimiento,
        ImagenDelProducto,
        CodigoDeBarra,
        Id_Proveedor,
        Id_Marca,
        Id_Categoria,
        CodigoProducto,
        Iva,
        PrecioMayorista,
        StockMinimo,
        Estado,
        CostoMedio,
        id_usuario_Producto,
        Saldo,
      ]
    );
    res.send({
      id: rows.insertId,
      Descripcion,
      PrecioCompra,
      PrecioVenta,
      Stock,
      FechaDeVencimiento,
      ImagenDelProducto,
      CodigoDeBarra,
      Id_Proveedor,
      Id_Marca,
      Id_Categoria,
      CodigoProducto,
      Iva,
      PrecioMayorista,
      StockMinimo,
      Estado,
      CostoMedio,
      id_usuario_Producto,
      Saldo,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ msg: "Error en el servidor" });
  }
};

export const putproductos = async (req, res) => {
  //consultar si el fontend va a necesitar por el params o por el body.
  const { id } = req.params;
  const {
    Descripcion,
    PrecioCompra,
    PrecioVenta,
    Stock,
    FechaDeVencimiento,
    ImagenDelProducto,
    CodigoDeBarra,
    Id_Proveedor,
    Id_Marca,
    Id_Categoria,
    CodigoProducto,
    Iva,
    PrecioMayorista,
    StockMinimo,
    Estado,
    CostoMedio,
    id_usuario_Producto,
    Saldo,
  } = req.body;
  console.log(id);
  try {
    const [result] = await pool.query(
      "UPDATE db_productos SET Descripcion = IFNULL(?, Descripcion) , PrecioCompra = IFNULL(?, PrecioCompra), PrecioVenta = IFNULL(?, PrecioVenta), Stock = IFNULL(?, Stock),FechaDeVencimiento = IFNULL(?, FechaDeVencimiento),ImagenDelProducto = IFNULL(?, ImagenDelProducto),CodigoDeBarra = IFNULL(?, CodigoDeBarra),Id_Proveedor = IFNULL(?, Id_Proveedor),Id_Marca = IFNULL(?, Id_Marca),Id_Categoria = IFNULL(?, Id_Categoria),CodigoProducto = IFNULL(?, CodigoProducto),Iva = IFNULL(?, Iva),PrecioMayorista = IFNULL(?, PrecioMayorista),StockMinimo = IFNULL(?, StockMinimo),Estado = IFNULL(?, Estado),CostoMedio = IFNULL(?, CostoMedio),id_usuario_Producto = IFNULL(?, id_usuario_Producto),Saldo = IFNULL(?, Saldo) WHERE id = ?",
      [
        Descripcion,
        PrecioCompra,
        PrecioVenta,
        Stock,
        FechaDeVencimiento,
        ImagenDelProducto,
        CodigoDeBarra,
        Id_Proveedor,
        Id_Marca,
        Id_Categoria,
        CodigoProducto,
        Iva,
        PrecioMayorista,
        StockMinimo,
        Estado,
        CostoMedio,
        id_usuario_Producto,
        Saldo,
        id,
      ]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({ msg: "No existe el producto" });
    }
    // ahora si existe el producto y se actualizo correctamente llamamos a la base de datos para que nos devuelva el producto actualizado
    const [rows] = await pool.query("SELECT * FROM db_productos WHERE id = ?", [
      id,
    ]);
    console.log(rows);
    res.json(rows[0]); //devuelve un json
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ msg: "Error en el servidor" });
  }
};

export const deleteproductos = async (req, res) => {
  //consultar si el fontend va a necesitar por el params o por el body.
  const { id } = req.params;

  console.log(id);

  try {
    const [result] = await pool.query(
      "UPDATE db_productos SET Estado = 0 WHERE id = ?",
      [id]
    );

    if (result.affectedRows <= 0) {
      return res.status(404).json({ msg: "No existe el producto" });
    }

    res.status(200).json({ msg: "Eliminado con Exito" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ msg: "Error en el servidor" });
  }
};
