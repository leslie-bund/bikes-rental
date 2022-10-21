import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
    },
    role: {
        type: String,
        enum: ["manager", "user"]
    },
    password: {
        type: String,
    }
},{
    timestamps: true,
})

export default model('Users', userSchema);