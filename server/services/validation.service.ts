import Joi, { ValidationError } from "joi";
import { Request, Response, NextFunction } from 'express'
import { ObjectId } from "mongoose";
import { RouteError } from "../declarations/classes";
import HttpStatusCodes from "../configurations/HttpStatusCodes";

class ValidationService {

    // Login validation
    static async validateLogin(req: Request, res: Response, next: NextFunction){
            
        const schema = Joi.object({
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'dev'] } }),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        })

        try {
            // Validate input details
            const { user, ...data } = req.body;
            const valid = await schema.validateAsync({...data});
            if(valid){
                next();
            }
        } catch (error: unknown ) {
            // Send Error to handler
            if (error instanceof ValidationError){
                const {message} = error.details[0];
                next(new RouteError( HttpStatusCodes.CONFLICT, message));
            }
               
        }
    }

    // sign up validation
    static async validateSignUp(req: Request, res: Response, next: NextFunction){
            
        const schema = Joi.object({
            name: Joi.string(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'dev'] } }),
            // role: Joi.string(),
            password: Joi.string()
                    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            confirmPassword: Joi.ref('password'),
        })

        try {
            // Validate input details
            const { user, ...data } = req.body;
            const valid = await schema.validateAsync({...data});
            if(valid){
                next();
            }
        } catch (error: unknown ) {
            // Send Error to handler
            if (error instanceof ValidationError){
                const {message} = error.details[0];
                next(new RouteError( HttpStatusCodes.CONFLICT, message));
            }
        }
    }

    // User edit validation - user
    static async validateUserEdit(req: Request, res: Response, next: NextFunction){
        const schema = Joi.object({
            password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            
            confirmPassword: Joi.ref('password'),
            name: Joi.string(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'dev'] } }),
            role: Joi.string()
        })

        try {
            // Validate input details
            const { user, ...data } = req.body;
            const valid = await schema.validateAsync({...data});
            if(valid){
                next();
            }
        } catch (error: unknown ) {
            // Send Error to handler
            if (error instanceof ValidationError){
                const {message} = error.details[0];
                next(new RouteError( HttpStatusCodes.CONFLICT, message));
            }
               
        }
    }

    // Bike edit validation
    static async validateBikeEntry(req: Request, res: Response, next: NextFunction){

        const schema = Joi.object({
            model: Joi.string(),
            color: Joi.string(),
            location: Joi.string(),
            // rating: Joi.number().max(5).min(1)
        })

        try {
            // Validate input details
            const { user, ...data } = req.body;
            const valid = await schema.validateAsync({...data});
            if(valid){
                next();
            }
        } catch (error: unknown ) {
            // Send Error to handler
            if (error instanceof ValidationError){
                const {message} = error.details[0];
                next(new RouteError( HttpStatusCodes.CONFLICT, message));
            }
               
        }
    }

    // reserve a bike validation
    static async validateReservation(req: Request, res: Response, next: NextFunction){
        const schema = Joi.object({
            // user_id: Joi.string<ObjectId>(), // user_id is present in req.body.user after auth
            // bike_id: Joi.string<ObjectId>(),
            startDate: Joi.date(),
            endDate: Joi.date()
        })

        try {
            // Validate input details
            const { user, ...data } = req.body;
            const valid = await schema.validateAsync({...data});
            if(valid){
                next();
            }
        } catch (error: unknown ) {
            // Send Error to handler
            if (error instanceof ValidationError){
                const {message} = error.details[0];
                next(new RouteError( HttpStatusCodes.CONFLICT, message));
            }
               
        }
    }

    // Rate a bike validation
    static async validateRating(req: Request, res: Response, next: NextFunction){
        
        const schema = Joi.object({
            // bikeId: Joi.string<ObjectId>(),
            rating: Joi.number().max(5).min(1)
        })

        try {
            // Validate input details
            const { user, ...data } = req.body;
            const valid = await schema.validateAsync({...data});
            if(valid){
                next();
            }
        } catch (error: unknown ) {
            // Send Error to handler
            if (error instanceof ValidationError){
                const {message} = error.details[0];
                next(new RouteError( HttpStatusCodes.CONFLICT, message));
            }
               
        }
    }

    // bike availability Date validation
    static async validateDate(req: Request, res: Response, next: NextFunction){
        
        const schema = Joi.object({
            // bikeId: Joi.string<ObjectId>(),
            date: Joi.date()
        })

        try {
            // Validate input details
            const { user, ...data } = req.body;
            const valid = await schema.validateAsync({...data});
            if(valid){
                next();
            }
        } catch (error: unknown ) {
            // Send Error to handler
            if (error instanceof ValidationError){
                const {message} = error.details[0];
                next(new RouteError( HttpStatusCodes.CONFLICT, message));
            }
               
        }
    }
}

export default ValidationService