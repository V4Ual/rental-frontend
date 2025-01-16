import Joi from 'joi'

export const AddProperty = Joi.object({
  propertyName: Joi.string().messages({
    "any.required": "propertyName type is mandatory.",
    "any.empty": "propertyName type is mandatory.",
  }),
  address: Joi.string().messages({
    "any.required": "Address type is mandatory.",
    "any.empty": "Address type is mandatory.",
  }),
  noOfRoom: Joi.string().messages({
    "any.required": "no-of-room type is mandatory.",
    "any.empty": "no-of-room type is mandatory.",
  }),
  roomNumber: Joi.array()
    .items(
      Joi.string()
        .pattern(/^\d+$/) // Ensure each item contains only digits
        .required()
        .messages({
          "string.pattern.base": "Room Number must contain only digits.",
          "any.required": "Each Room Number is mandatory.",
          "string.empty": "Room Number cannot be empty.",
        })
    )
    .min(1) // Ensure at least one room number is provided
    .required()
    .messages({
      "array.base": "Room Number must be an array.",
      "array.min": "At least one Room Number is required.",
      "any.required": "Room Number is mandatory.",
    }),
  image: Joi.array().messages({
    "any.required": "image type is mandatory.",
    "any.empty": "image type is mandatory.",
  }),
});

