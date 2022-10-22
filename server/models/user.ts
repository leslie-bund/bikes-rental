import { Schema, model } from 'mongoose';
import Reservation from './reservation';

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

userSchema.post('findOneAndDelete', async function(doc){
    try {
        const result = await Reservation.deleteMany({ user_id: doc?._id });
        if(+result.deletedCount >= 0){
            return;
        }
    } catch (error: unknown) {
        console.error('Mongoose middleware error (USERS): ',error);
    }
})

export default model('Users', userSchema);