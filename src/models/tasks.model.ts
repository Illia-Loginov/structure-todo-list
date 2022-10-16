import { Schema, model } from 'mongoose';
import { ITask } from '../interfaces';

const taskSchema = new Schema<ITask>({
    body: { type: String, required: true, minlength: 1, maxlength: 200},
    deadline: { type: Date },
    completed: { type: Date }
}, { timestamps: true, versionKey: false });

export const Task = model<ITask>('Task', taskSchema);