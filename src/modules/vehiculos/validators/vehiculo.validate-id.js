import Joi from 'joi';

export const vehiculoIdParamSchema = Joi.object({
  id: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.base': 'El id debe ser un número',
      'number.integer': 'El id debe ser un entero',
      'number.positive': 'El id debe ser positivo',
      'any.required': 'El id es obligatorio'
    })
});
