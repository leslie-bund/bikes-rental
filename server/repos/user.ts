import UniversalRepository from "./universal";
import { Model } from "mongoose";
import Users from "../models/user";

class UserRepository extends UniversalRepository {
    constructor(Users: Model<any>){
        super(Users)
    }

    
}

export default new UserRepository(Users);