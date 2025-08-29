import { Router } from "express";
import vehiculoController from "../controller/vehiculo.controller.js";

const VehiculoRouter = Router();

VehiculoRouter.get("/", (req, res) => vehiculoController.getAll(req, res));

VehiculoRouter.get("/:id", (req, res) => vehiculoController.getById(req, res));

VehiculoRouter.post("/", (req, res) => vehiculoController.create(req, res));

VehiculoRouter.patch("/:id", (req, res) => vehiculoController.update(req, res));

VehiculoRouter.delete("/:id", (req, res) => vehiculoController.deleteById(req, res));

export default VehiculoRouter;