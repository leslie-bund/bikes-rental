import { Schema, model } from "mongoose";

const bikeSchema = new Schema({
    model: String,
    color: String,
    location: String,
    rating: {
        type: [Number],
        get: (v: number[]) => (v.reduce((acc, ele) => acc + ele) / v.length)
    },
    nextAvailableDate: {
        type: Date
    }
}, {
    timestamps: true
});

export default model('Bikes', bikeSchema);