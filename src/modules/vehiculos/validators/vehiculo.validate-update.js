import Joi from 'joi';

export const updateVehiculoSchema = Joi.object({
  marca: Joi.string()
    .max(30)
    .required()
    .messages({
      'string.empty': 'El campo marca no puede estar vacío',
      'string.max': 'El campo marca no puede exceder los 30 caracteres',
      'any.required': 'El campo marca es obligatorio'
    }),

  modelo: Joi.string()
    .max(30)
    .required()
    .messages({
      'string.empty': 'El campo modelo no puede estar vacío',
      'string.max': 'El campo modelo no puede exceder los 30 caracteres',
      'any.required': 'El campo modelo es obligatorio'
    }),

  color: Joi.string()
    .max(20)
    .required()
    .messages({
      'string.empty': 'El campo color no puede estar vacío',
      'string.max': 'El campo color no puede exceder los 20 caracteres',
      'any.required': 'El campo color es obligatorio'
    }),

  precio: Joi.number()
    .precision(2)
    .min(0)
    .max(9999999.99)
    .required()
    .messages({
      'number.base': 'El campo precio debe ser un número',
      'number.min': 'El campo precio no puede ser negativo',
      'number.max': 'El campo precio no puede exceder 9,999,999.99',
      'any.required': 'El campo precio es obligatorio'
    }),

  placa: Joi.string()
    .length(7)
    .required()
    .pattern(/^[A-Z]{3}-\d{3}$/i)
    .messages({
      'string.empty': 'El campo placa no puede estar vacío',
      'string.length': 'El campo placa debe tener exactamente 7 caracteres',
      'string.pattern.base': 'El campo placa debe tener el formato AAA-123',
      'any.required': 'El campo placa es obligatorio'
    })
});
