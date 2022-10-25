import { Schema, model } from 'mongoose'
import Bikes from '../repos/bikes'

const reservationSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    bike_id: {
        type: Schema.Types.ObjectId,
        ref: 'Bikes',
        required: true
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(v: string){
                return new Date(v).getTime() >= new Date().getTime()
            },
            message: 'Cannot reserve for dates earlier than today!'
        }
    },
    endDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

reservationSchema.index({ user_id: 1, bike_id: -1 })

reservationSchema.post('save', async function(doc){
    const query =  { nextAvailableDate: doc?.endDate }
    const result = await Bikes.update(doc?.bike_id as unknown as string, query);
    if(result){
        console.log('Updated Bike Document after Reservation saved: ', result);
        return;
    }
    return;
})

reservationSchema.post('findOneAndDelete', async function(doc){
    const query =  { nextAvailableDate: new Date() }
    const result = await Bikes.update(doc?.bike_id as unknown as string, query);
    if(result){
        console.log('Updated Bike Document after Reservation cancelled: ', result);
        return;
    }
    return;
})

export default model('Reservations', reservationSchema)