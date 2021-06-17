import { Schema, model } from 'mongoose';

const clientSchema = new Schema({
    name: String,
    lastName: String, 
    birthDate: String
}, {
    timestamps: true,
    versionKey: false //__v avoid
})

//singupDate
//downDate

export default model('Client', clientSchema);