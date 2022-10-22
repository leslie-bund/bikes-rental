import UniversalRepository from "./universal";
import { Model } from "mongoose";
import Reservations from "../models/reservation";
import { RouteError } from "../declarations/classes";
import HttpStatusCodes from "../configurations/HttpStatusCodes";

class ReservationRepository extends UniversalRepository {
    constructor(Reservations: Model<any>){
        super(Reservations)
    }

    //view all reservations
    async allReservations(){
        try {
            const doc = await this.model.find({ 
                endDate: { $gte: new Date() }
            })
            .sort({ endDate: 1 })
            .lean()
            .exec()

            return doc;
        } catch (error: any) {
            throw new RouteError(HttpStatusCodes.NO_CONTENT, error?.message);  
        }
    }

    //All Users that reserved & dates
    async allUsersReservationAndDates(){
        try {
            const doc = await this.model.find({ 
                endDate: { $gte: new Date() }
            })
            .populate('user_id')
            .sort({ endDate: 1 })
            .lean()
            .exec()

            return doc;
        } catch (error: any) {
            throw new RouteError(HttpStatusCodes.NO_CONTENT, error?.message);  
        }
    }

    //All bikes reserved & dates
    async allBikesReservationAndDates(){
        try {
            const doc = await this.model.find({ 
                endDate: { $gte: new Date() }
            })
            .populate('bike_id')
            .sort({ endDate: 1 })
            .lean()
            .exec()

            return doc;
        } catch (error: any) {
            throw new RouteError(HttpStatusCodes.NO_CONTENT, error?.message);  
        }
    }
}

export default new ReservationRepository(Reservations);