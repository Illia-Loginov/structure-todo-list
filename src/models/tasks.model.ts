import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
    body: { type: String, required: true, minlength: 1, maxlength: 200},
    deadline: { type: Date },
    completed: { type: Date }
}, { timestamps: true, versionKey: false });

export const Task = model('Task', taskSchema);