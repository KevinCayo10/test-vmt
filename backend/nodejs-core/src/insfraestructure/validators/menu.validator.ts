import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const createMenuSchema = Joi.object({
  remoteEntry: Joi.string().uri().trim().max(1024).required(),
  exposedModule: Joi.string().trim().min(1).max(255).required(),
  displayName: Joi.string().trim().min(1).max(255).required(),
  routePath: Joi.string().trim().min(1).max(255).required(),
  ngModuleName: Joi.string().trim().min(1).max(255).required(),
});

export const updateMenuSchema = Joi.object({
  remoteEntry: Joi.string().uri().trim().max(1024),
  exposedModule: Joi.string().trim().min(1).max(255),
  displayName: Joi.string().trim().min(1).max(255),
  routePath: Joi.string().trim().min(1).max(255),
  ngModuleName: Joi.string().trim().min(1).max(255),
}).min(1);

export const idParamSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});

function sendValidationError(res: Response, error: Joi.ValidationError) {
  const details = error.details.map((d) => ({
    message: d.message,
    path: d.path,
  }));
  return res.status(400).json({ message: "Validation error", details });
}

export const validateBody = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) return sendValidationError(res, error);
    req.body = value;
    next();
  };
};

export const validateParams = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.params, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) return sendValidationError(res, error);
    req.params = value as any;
    next();
  };
};
