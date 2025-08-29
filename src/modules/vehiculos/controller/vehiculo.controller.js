import { ControllerBase } from "../../shared/controller-base.js";
import Vehiculo from "../models/vehiculo.model.js";
import { createVehiculoSchema } from "../validators/vehiculo.validate-create.js";
import { updateVehiculoSchema } from "../validators/vehiculo.validate-update.js";
import { vehiculoIdParamSchema } from "../validators/vehiculo.validate-id.js";

class VehiculoController extends ControllerBase {
  async getAll(_, res) {
    try {
      const vehiculos = await Vehiculo.getAll(this.getDbPool());
      res.json(vehiculos);
    } catch (error) {
      this.handleError(res, 500, error, "Error al obtener los vehiculos");
    }
  }

  async getById(req, res) {
    try {
      const { error: idError } = vehiculoIdParamSchema.validate(req.params);
      if (idError) return this.handleError(res, 400, idError, 'Id inválido', idError.details.map(d => d.message));
      
      const id = parseInt(req.params.id);
      const vehiculo = await Vehiculo.getById(this.getDbPool(), id);

      if (!vehiculo) return this.handleError(res, 404, "Vehiculo no encontrado");
      res.json(vehiculo);
    } catch (error) {
      this.handleError(res, 500, error, "Error al obtener el vehiculo");
    }
  }

  async create(req, res) {
    try {
      const { error: validationError, value } = createVehiculoSchema.validate(req.body, { abortEarly: false });
      if (validationError) {
        return res.status(400).json({
          message: "Validación fallida",
          details: validationError.details.map(d => d.message)
        });
      }

      const exists = await Vehiculo.exists(this.getDbPool(), value.placa);
      if (exists) {
        return res.status(400).json({ message: "Ya existe un vehiculo con esta placa" });
      }

      const vehiculo = new Vehiculo(
        null,
        value.marca,
        value.modelo,
        value.color,
        value.precio,
        value.placa,

      );
      const result = await vehiculo.create(this.getDbPool());

      res.status(201).json({ message: "Vehiculo creado", id: result.insertId });
    } catch (error) {
      this.handleError(res, 500, error, "Error al crear el vehiculo");
    }
  }

  async update(req, res) {
    try {
      const { error: idError } = vehiculoIdParamSchema.validate(req.params);
      if (idError) return this.handleError(res, 400, idError, 'Id inválido', idError.details.map(d => d.message));

      const id = parseInt(req.params.id);

      const existingVehiculo = await Vehiculo.getById(this.getDbPool(), id);
      if (!existingVehiculo) return res.status(404).json({ message: "Vehiculo no encontrado" });

      const { error } = updateVehiculoSchema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({
          message: "Validación fallida",
          details: error.details.map(d => d.message)
        });
      }
      const exists = await Vehiculo.exists(this.getDbPool(), req.body.placa, id);
      if (exists) return res.status(400).json({ message: "Ya existe un vehiculo con esta placa" });

      const vehiculo = new Vehiculo(
        id,
        req.body.marca,
        req.body.modelo,
        req.body.color,
        req.body.precio,
        req.body.placa,
      );
      const result = await vehiculo.update(this.getDbPool());

      if (result.affectedRows === 0) return res.sendStatus(204);

      res.json({ message: "Vehiculo actualizado" });
    } catch (error) {
      this.handleError(res, 500, error, "Error al actualizar el vehiculo");
    }
  }

  async deleteById(req, res) {
    try {
      const { error: idError } = vehiculoIdParamSchema.validate(req.params);
      if (idError) return this.handleError(res, 400, idError, 'Id inválido', idError.details.map(d => d.message));

      const id = parseInt(req.params.id);

      const vehiculo = await Vehiculo.getById(this.getDbPool(), id);
      if (!vehiculo) return res.status(404).json({ message: "Vehiculo no encontrado" });

      const result = await Vehiculo.softDelete(this.getDbPool(), id);
      if (result.affectedRows === 0) return res.status(400).json({ message: "No se puede eliminar el vehiculo" });

      res.json({ message: "Vehiculo eliminado" });
    } catch (error) {
      this.handleError(res, 500, error, "Error al eliminar el vehiculo");
    }
  }
}

export default new VehiculoController();