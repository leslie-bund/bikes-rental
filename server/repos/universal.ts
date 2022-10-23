// **** Functions **** //
import { RouteError } from "../declarations/classes";
import { Document, Model } from "mongoose";
import HttpStatusCodes from "../configurations/HttpStatusCodes";

interface Ifilter {
    [k: string]: string | Date | Ifilter | number | unknown;
}

class UniversalRepository {
    model: Model<any>;
    constructor(model: Model<any>){
        this.model = model;
    }
    /**
     * Get one user.
     */
    async getOne<T>(filter: any): Promise<Document<T, any> | null> {
        try {
            const doc = await this.model.findOne(filter).lean().exec()
            if(!doc) {
                throw new Error(`No documents found for the filter ${JSON.stringify(filter, null, 1)}`);
            }
            return doc;
        } catch (error: any) {
            throw new RouteError(HttpStatusCodes.NO_CONTENT, error.message);    
        }
        return null;
    }

    /**
     * See if a user with the given id exists.
     */
    async persists(id: number): Promise<boolean | void> {
        try {
            
        } catch (error: any) {
            
        }
    }

    /**
     * Get all users.
     */
    async getAll(filter?: Ifilter): Promise<Document[] | unknown> {
        try {
            let doc;
            if(filter instanceof Object){
               doc = await this.model.find(filter).exec()
            } else {
                doc = await this.model.find().exec();
            }
            return doc;
        } catch (error: any) {
            throw new RouteError(HttpStatusCodes.NO_CONTENT, error.message);          
        }
    }

    /**
     * Add one entity.
     */
    async add(newEntity: Ifilter): Promise<boolean> {
        try {
            const doc = new this.model(newEntity);
            await doc.save()
            return true;
        } catch (error: any) {
            throw new RouteError(HttpStatusCodes.BAD_REQUEST, error.message);            
        }
    }

    /**
     * Update a user.
     */
    async update<T>(id: string, updateObj: any): Promise<Document<T> | unknown> {
        try {
            const doc = await this.model.findByIdAndUpdate(id, { $set: updateObj }, { new: true }).lean().exec();
            return doc;
        } catch (error: any) {
            throw new RouteError(HttpStatusCodes.BAD_REQUEST, error.message);            
        }
    }

    /**
     * Delete one user.
     */
    async _delete(filter: { _id: string }): Promise<Document | void> {
        try {
            const doc = await this.model.findOneAndDelete(filter).lean().exec();
            return doc;
        } catch (error: any) {
            throw new RouteError(HttpStatusCodes.BAD_REQUEST, error.message);            
        }
    }
}
// **** Export default **** //

export default UniversalRepository;

