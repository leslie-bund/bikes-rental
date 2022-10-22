import Joi, { ValidationError } from "joi";
import { Request, Response, NextFunction } from 'express'
import { ObjectId } from "mongoose";
import { RouteError } from "../declarations/classes";
import HttpStatusCodes from "../configurations/HttpStatusCodes";

class ValidationService {

    // Login validation
    async validateLogin(req: Request, res: Response, next: NextFunction){
            
        const schema = Joi.object({
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'dev'] } }),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        })

        try {
            // Validate input details
            const data = req.body;
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
    async validateSignUp(req: Request, res: Response, next: NextFunction){
            
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
            const data = req.body;
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
    async validateUserEdit(req: Request, res: Response, next: NextFunction){
        const schema = Joi.object({
            newPassword: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            
            confirmPassword: Joi.ref('password'),
            name: Joi.string(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'dev'] } }),
            role: Joi.string()
        })

        try {
            // Validate input details
            const data = req.body;
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
    async validateBikeEntry(req: Request, res: Response, next: NextFunction){

        const schema = Joi.object({
            model: Joi.string(),
            color: Joi.string(),
            location: Joi.string(),
            rating: Joi.number().max(5).min(1)
        })

        try {
            // Validate input details
            const data = req.body;
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
    async validateReservation(req: Request, res: Response, next: NextFunction){
        const schema = Joi.object({
            user_id: Joi.string<ObjectId>(),
            bike_id: Joi.string<ObjectId>(),
            startDate: Joi.string(),
            endDate: Joi.string()
        })

        try {
            // Validate input details
            const data = req.body;
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
    async validateRating(req: Request, res: Response, next: NextFunction){
        
        const schema = Joi.object({
            id: Joi.string<ObjectId>(),
            rating: Joi.number().max(5).min(1)
        })

        try {
            // Validate input details
            const data = req.body;
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