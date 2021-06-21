import { Schema, model } from 'mongoose';

const checkInSchema = new Schema({
    client: [{
        ref: 'Client',
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false //__v avoid
})

//singupDate
//downDate

export default model('CheckIn', checkInSchema);