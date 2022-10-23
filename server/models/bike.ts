import { Schema, model } from "mongoose";
import Reservation from "./reservation";

const bikeSchema = new Schema({
    model: String,
    color: String,
    location: String,
    rating: {
        type: [Number],
        // get: (v: number[]) => [(v.reduce((acc, ele) => acc + ele) / v.length)]
    },
    nextAvailableDate: {
        type: Date,
        default: Date()
    }
}, {
    timestamps: true
});

bikeSchema.index({ model: 1, color: 1, location: 1 }, { unique: true });

bikeSchema.post('findOneAndDelete', async function(doc){
    try {
        const result = await Reservation.deleteMany({ bike_id: doc?._id });
        if(+result.deletedCount >= 0){
            return;
        }
    } catch (error: unknown) {
        console.error('Mongoose middleware error (BIKES): ',error);
    }
})

export default model('Bikes', bikeSchema);