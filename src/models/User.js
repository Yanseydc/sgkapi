import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        ref: "Role", //this is the name of the relation
        type: Schema.Types.ObjectId  //add foreign key
    }]
}, {
    timestamps: true,
    versionKey: false
});

//methods to crypt and decrypt password
//statics to call method without instance object

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);    
    return await bcrypt.hash(password, salt);
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}




export default model("User", userSchema);