import express, { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from '../configurations/HttpStatusCodes';
import { RouteError } from '../declarations/classes';
import jwtUtil from '../util/jwt-util';
import userRepo from '../repos/user';

const authService = async function(req: Request, res: Response, next: NextFunction){
    if(req.headers.authorization !== undefined){    
        let token = req.headers.authorization.startsWith('Bearer') ?
                    req.headers.authorization.split(' ')[1] :
                    req.headers.authorization;
        try {
            const payload = await jwtUtil.decode(token);
            if(payload instanceof Object){
                const result = await userRepo.getOne(payload as unknown as Ifilter);
                if(!result) {
                    throw new Error('User not found');    
                } else {
                    req.body.user = result;
                    next();
                }
            } else {
                throw new Error('Invalid Token supplied');
            }
        } catch (error: any) {
            next(new RouteError(HttpStatusCodes.FORBIDDEN, error?.message));
        }
    } else {
        next(new RouteError(HttpStatusCodes.FORBIDDEN,'Not authorized, no token'));
    }
}

export default authService;