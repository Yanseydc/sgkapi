import { Schema, model } from 'mongoose';

const planSchema = new Schema({
    name: String, //plan name e.g (monthly, bimestral, semestral)
    cost: String, //plan cost e.g (100, 200, 300)
    quantity: Number //plan months quantity e.g (1,2,3,4)Months
}, {
    timestamps: true,
    versionKey: false
});

export default model('Plan', planSchema);