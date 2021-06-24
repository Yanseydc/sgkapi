import { Schema, model } from 'mongoose';

const clientSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthDate: { type: Date, required: false },    
    phone: { type: String, required: false },
    referenceName: { type: String, required: false },
    referencePhone: { type: String, required: false },
    email: { type: String, required: false }
}, {
    timestamps: true,
    versionKey: false //__v avoid
})

//singupDate
//downDate

export default model('Client', clientSchema);