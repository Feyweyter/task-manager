import mongoose from 'mongoose';
import { ITask, TaskStatus } from '../types/task';

const TaskSchema = new mongoose.Schema<ITask>({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    status: {
        type: String,
        enum: Object.values(TaskStatus),
        default: TaskStatus.PENDING
    },
    dueDate: {
        type: Date,
        validate: {
            validator: function(v: Date) {
                return v >= new Date();
            },
            message: 'Due date must be in the future'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Task = mongoose.model<ITask>('Task', TaskSchema);
export default Task;