import { Schema, model } from 'mongoose';

const planSchema = new Schema({
    name: String,
    cost: String
}, {
    timestamps: true,
    versionKey: false
});

export default model('Plan', planSchema);