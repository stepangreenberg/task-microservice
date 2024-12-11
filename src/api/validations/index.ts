import Joi from 'joi';

export const createTaskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    user_id: Joi.number().required()
});

export const updateTaskStatusSchema = Joi.object({
    status: Joi.string().valid('pending', 'in-progress', 'done').required()
});

export const createUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required()
});