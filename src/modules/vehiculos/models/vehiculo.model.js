import ModelBase from "../../shared/model-base.js";

class Vehiculo extends ModelBase {
  constructor(
    id = null,
    marca,
    modelo,
    color,
    precio,
    placa
  ) {
    super();
    this.id = id;
    this.marca = marca;
    this.modelo = modelo;
    this.color = color;
    this.precio = precio;
    this.placa = placa;
  }

  static async getById(conexion, id) {
    const [result] = await conexion.query(
      "SELECT * FROM vehiculos WHERE id = ? AND deleted_at IS NULL",
      [id]
    );
    return result[0];
  }

  static async getAll(conexion) {
    const [result] = await conexion.query(
      "SELECT * FROM vehiculos WHERE deleted_at IS NULL"
    );
    return result;
  }

  async create(conexion) {
    const now = new Date();
    this.created_at = now;
    this.updated_at = now;

    const [result] = await conexion.query(
      `INSERT INTO vehiculos (marca, modelo, color, precio, placa, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        this.marca,
        this.modelo,
        this.color,
        this.precio,
        this.placa,
        this.created_at,
        this.updated_at
      ]
    );
    this.id = result.insertId;
    return result;
  }

  async update(conexion) {
    this.updated_at = new Date();

    const [result] = await conexion.query(
      `UPDATE vehiculos
             SET marca = ?,modelo = ?,color = ?,precio = ?,placa = ?, updated_at = ?
             WHERE id = ? AND deleted_at IS NULL`,
      [
        this.marca,
        this.modelo,
        this.color,
        this.precio,
        this.placa,
        this.updated_at,
        this.id
      ]
    );
    return result;
  }

  static async softDelete(conexion, id) {
    const deleted_at = new Date();
    const [result] = await conexion.query(
      `UPDATE vehiculos SET deleted_at = ? WHERE id = ? AND deleted_at IS NULL`,
      [deleted_at, id]
    );
    return result;
  }

  static async exists(conexion, idExists, placa) {
    const [result] = await conexion.query(
      "SELECT COUNT(*) AS count FROM vehiculos WHERE placa = ? AND ID != ? AND deleted_at IS NULL",
      [placa, idExists]
    );
    return result[0].count > 0;
  }

}

export default Vehiculo;