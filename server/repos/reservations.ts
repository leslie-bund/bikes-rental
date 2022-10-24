import UniversalRepository from "./universal";
import { Model } from "mongoose";
import Reservation from "../models/reservation";
import { RouteError } from "../declarations/classes";
import HttpStatusCodes from "../configurations/HttpStatusCodes";

class ReservationRepository extends UniversalRepository {
    constructor(Reservation: Model<any>){
        super(Reservation)
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

    //Get Reservations for each user and the bikes
    async userReservations(userId: string) {
        try {
            const doc = await this.model.findById(userId)
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

export default new ReservationRepository(Reservation);