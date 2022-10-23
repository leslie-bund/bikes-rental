import UniversalRepository from "./universal";
import { Model } from "mongoose";
import Bikes from "../models/bike";
import HttpStatusCodes from "../configurations/HttpStatusCodes";
import { RouteError } from "../declarations/classes";


interface IBike {
    model?: string;
    color?: string;
    location?: string;
    rating?: number | string;
}

class BikeRepository extends UniversalRepository {
    constructor(Bikes: Model<any>){
        super(Bikes)
    }

    // All available bikes for some specific date
    async emptyBikesForDate(dateString: string) {
        try {
            const doc = await this.getAll({
                nextAvailableDate: {
                    $lte: new Date(dateString)
                }
            })
            return doc;
        } catch (error: any) {
            throw new RouteError(HttpStatusCodes.NO_CONTENT, error?.message);
        }
    }

    // Rate bike with a score of 1 - 5
    async rateBike(rating: number,bikeId: string){
        try {
            const doc = await this.model.updateOne({ _id: bikeId }, { 
                $push: {
                    rating: rating
                }
            });
            if(doc.acknowledged){
                return await this.getOne({ _id: bikeId });
            }
        } catch (error: any) {
            throw new RouteError(HttpStatusCodes.NO_CONTENT, error?.message);
        }
    }

}

export default new BikeRepository(Bikes);