import Joi from 'joi';
import { TaskStatus } from '../types/task';

export const taskValidationSchema = Joi.object({
    title: Joi.string()
        .required()
        .max(100)
        .trim(),
    description: Joi.string()
        .optional()
        .max(500)
        .trim(),
    status: Joi.string()
        .valid(...Object.values(TaskStatus))
        .default(TaskStatus.PENDING),
    dueDate: Joi.date()
        .iso()
        .min('now')
        .required()
});