import { Request, Response, NextFunction } from 'express';
import { BikeService, UserService, ReservationService } from '../services';
import { RouteError } from '../declarations/classes';
import HttpStatusCodes from '../configurations/HttpStatusCodes';
import asyncHandler from "express-async-handler";
const debug = require('debug')('easy-bikes:server');

class ManagerController {
    // Login
    static login = asyncHandler(async function mngrCtrlLogin(req: Request, res: Response, next: NextFunction){
        const { email, password } = req.body
        const data = await UserService.login({ email, password });
        if(!data) {
            throw new RouteError(HttpStatusCodes.NO_CONTENT, 'Invalid Password');
        }
        res.status(HttpStatusCodes.OK).json({ data: data, status: 'OK' });
        return;
    })

    // Signup
    static signUp = asyncHandler(async function mngrCtrlSignup(req: Request, res: Response, next: NextFunction) {
        const { user, ...data } = req.body;
        const newUser = await UserService.signUp(data, 'manager');
        if(newUser){
            res.status(HttpStatusCodes.OK).json({ data: newUser, status: 'OK' })
            return;
        }
        res.sendStatus(HttpStatusCodes.NOT_FOUND)
        return;
    })

    // View single User
    static viewUser = asyncHandler(async function mngrCtrlView(req: Request, res: Response, next: NextFunction){
        const { userId } = req.params;
        const user = await UserService.viewUser(userId)
        if(user){
            res.status(HttpStatusCodes.OK).json({ data: user , status: 'OK' })
            return;
        }
        res.sendStatus(HttpStatusCodes.NOT_FOUND)
        return;
    })

    // Edit single User
    static editUser = asyncHandler(async function mngrCtrlEditUsr(req: Request, res: Response, next: NextFunction){
        const { user, ...data } = req.body;
        const { userId } = req.params;
        const editedUser = await UserService.edit(data, userId);
        if(editedUser){
            res.status(HttpStatusCodes.OK).json({ data: editedUser , status: 'OK' })
            return;
        }
        res.sendStatus(HttpStatusCodes.NOT_FOUND)
        return;
    })

    // Delete single User
    static deleteUser = asyncHandler(async function mngrCtrlDelUsr(req: Request, res: Response, next: NextFunction){
        const { userId } = req.params;
        const deletedUser = await UserService.delete(userId);
        if(deletedUser){
            res.status(HttpStatusCodes.OK).json({ data: deletedUser , status: 'OK' })
            return;
        }
        res.sendStatus(HttpStatusCodes.NOT_FOUND)
        return;
    })

    // Create Bike
    static createBike = asyncHandler(async function mngrCtrlCr8Bike(req: Request, res: Response, next: NextFunction) {
        const { user, ...data } = req.body;
        const newBike = await BikeService.createBike(data)
        if(newBike){
            res.status(HttpStatusCodes.OK).json({ data: newBike, status: 'OK' })
            return;
        }
        res.sendStatus(HttpStatusCodes.NOT_FOUND)
        return;
    })
    // View Single Bike(id) 
    static viewBike = asyncHandler(async function mngrCtrlGetBike(req: Request, res: Response, next: NextFunction){
        const { bikeId } = req.params;
        const oneBike = await BikeService.viewBike(bikeId);
        if(oneBike){
            res.status(HttpStatusCodes.OK).json({ data: oneBike , status: 'OK' })
            return;
        }
        res.sendStatus(HttpStatusCodes.NOT_FOUND)
        return;
    })   
    // Delete single Bike(id)
    static deleteBike = asyncHandler(async function mngrCtrlDelBike(req: Request, res: Response, next: NextFunction){
        const { bikeId } = req.params;
        const deletedBike = await BikeService.delete(bikeId);
        if(deletedBike){
            res.status(HttpStatusCodes.OK).json({ data: deletedBike , status: 'OK' })
            return;
        }
        res.sendStatus(HttpStatusCodes.NOT_FOUND)
        return;
    })

    // Edit single bike
    static editBike = asyncHandler(async function mngrCtrlEditBike(req: Request, res: Response, next: NextFunction){
        const { user, ...data } = req.body;
        const { bikeId } = req.params;
        const editedBike = await BikeService.edit(data, bikeId);
        if(editedBike){
            res.status(HttpStatusCodes.OK).json({ data: editedBike , status: 'OK' })
            return;
        }
        res.sendStatus(HttpStatusCodes.NOT_FOUND)
        return;
    })

    /* View all reservations
     * (Using req.query process the rest)
     * --> All users that reserved and dates
     * --> All bikes that were reserved and dates
     */
    static allReservations = asyncHandler(async function msgCtrlAllReserves(req: Request, res: Response, next: NextFunction) {
        const { mode } = req.query;
        let result;
        if(!mode) {
            result = await ReservationService.viewAllReservation()
        } else if(mode === 'users') {
            result = await ReservationService.viewAllUserReservations()
        } else if(mode === 'bikes') {
            result = await ReservationService.viewAllBikeReservations()
        }
        if(result){
            res.status(HttpStatusCodes.OK).json({ data: result , status: 'OK' })
            return;
        }
        res.sendStatus(HttpStatusCodes.NOT_FOUND)
        return;
    })
}

export default ManagerController