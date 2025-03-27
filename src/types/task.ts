import { Document } from 'mongoose';

export enum TaskStatus {
    PENDING = 'pending',
    COMPLETED = 'completed'
}

export interface ITask extends Document {
    title: string;
    description?: string;
    status: TaskStatus;
    dueDate: Date;
    createdAt: Date;
}

export interface TaskInput {
    title: string;
    description?: string;
    status?: TaskStatus;
    dueDate: Date;
}