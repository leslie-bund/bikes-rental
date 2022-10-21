import { Schema, model } from 'mongoose'

const reservationSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    bike_id: {
        type: Schema.Types.ObjectId,
        ref: 'Bikes'
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    }
}, {
    timestamps: true
})

export default model('Reservations', reservationSchema)