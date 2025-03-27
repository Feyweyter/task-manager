import { Request, Response, NextFunction } from 'express';
import Task from '../models/task';
import { taskValidationSchema } from '../utils/validation-schemas';
import { TaskInput } from '../types/task';
import { AppError } from '../middleware/error-handler';

export const createTask = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Validate request body
        const { error, value } = taskValidationSchema.validate(req.body);

        if (error) {
            throw new AppError(error.details[0].message, 400);
        }

        const taskInput: TaskInput = value;
        const task = new Task(taskInput);

        await task.save();

        res.status(201).json({
            status: 'success',
            data: task
        });
    } catch (error) {
        next(error);
    }
};

export const getTasks = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skipIndex = (page - 1) * limit;

        const tasks = await Task.find()
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skipIndex);

        const total = await Task.countDocuments();

        res.json({
            status: 'success',
            page,
            totalPages: Math.ceil(total / limit),
            data: tasks
        });
    } catch (error) {
        next(error);
    }
};

export const getTaskById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            throw new AppError('Task not found', 404);
        }

        res.json({
            status: 'success',
            data: task
        });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Validate request body
        const { error, value } = taskValidationSchema.validate(req.body);

        if (error) {
            throw new AppError(error.details[0].message, 400);
        }

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            value,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            throw new AppError('Task not found', 404);
        }

        res.json({
            status: 'success',
            data: task
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            throw new AppError('Task not found', 404);
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};