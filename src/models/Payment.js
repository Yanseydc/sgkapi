import { Schema, model } from 'mongoose';

const paymentSchema = new Schema({         
    client: [{
        ref: 'Client',
        type: Schema.Types.ObjectId,
        required: true
    }],
    // plan: [{
    //     ref: 'Plan',
    //     type: Schema.Types.ObjectId,
    //     required: false
    // }],
    months: {
        type: Number,
        required: true
    },
    entryDate: {
        type: Date,
        required: true
    },
    cost: {
        type: Number,
        required: false
    }
}, {
    timestamps: true,
    versionKey: false //__v avoid
});

//singupDate
//downDate

export default model('Payment', paymentSchema);