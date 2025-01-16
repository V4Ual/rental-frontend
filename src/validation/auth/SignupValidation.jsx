import Joi from 'joi'

export const loginAuth = Joi.object({
  password: Joi.string().min(6).max(10).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).messages({
    "any.required": "password type is mandatory.",
    "any.empty": "password type is mandatory.",
    
  }),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .messages({
      "any.required": "Email is mandatory.",
      "any.empty": "Email is mandatory.",
      "string.email": "Invalid email format.",
    }),
})

export const otpValidation = Joi.object({
  otp: Joi.string().min(6).max(6).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).messages({
    "any.required": "otp  is mandatory.",
    "any.empty": "otp  is mandatory.",
    
  }),
});

export const emailValidation = Joi.object({
  email: Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  })
  .messages({
    "any.required": "Email is mandatory.",
    "any.empty": "Email is mandatory.",
    "string.email": "Invalid email format.",
  }),
  captcha:Joi.string(),
  forgetPassword:Joi.boolean()
})


export const confirmPasswordValidation = Joi.object({
  password: Joi.string().min(6).max(10).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).messages({
    "any.required": "password type is mandatory.",
    "any.empty": "password type is mandatory.",
  }),
  confirmPassword: Joi.string().min(6).max(10).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).messages({
    "any.required": "password type is mandatory.",
    "any.empty": "password type is mandatory.",
  }),
})

// loginAuth.va
