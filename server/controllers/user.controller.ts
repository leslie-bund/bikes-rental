import { 
    UserService,
    BikeService,
    ReservationService
} from '../services'
import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from '../configurations/HttpStatusCodes';
import asyncHandler from 'express-async-handler';
import { RouteError } from '../declarations/classes';
const debug = require('debug')('easy-bikes:server');

class UserController {

    // Login
    static login = asyncHandler(async function usrCtrlLogin(req: Request, res: Response, next: NextFunction){
        const { email, password } = req.body
        const data = await UserService.login({ email, password });
        if(!data) {
            throw new RouteError(HttpStatusCodes.NO_CONTENT, 'Invalid Password');
        }
        res.status(HttpStatusCodes.OK).json({ data: data, status: 'OK' });
        return;
    })

    // Signup
    static signUp = asyncHandler(async function usrCtrlSignup(req: Request, res: Response, next: NextFunction) {
        const { user, ...data } = req.body;
        const newUser = await UserService.signUp(data, 'user');
        if(newUser){
            res.status(HttpStatusCodes.OK).json({ data: newUser, status: 'OK' })
            return;
        }
        res.sendStatus(HttpStatusCodes.NOT_FOUND)
        return;
    })

    // Edit my password^*
    // My reservations^*

    // All available bikes [for specified Date]
    static availableBikesByDate = asyncHandler(async function usrCtrlAvailByDate(req: Request, res: Response, next: NextFunction){
        const { date } = req.params;
        const bikes = await BikeService.availableByDate(date);
        if(bikes){
            res.status(HttpStatusCodes.OK).json({ data: bikes, status: 'OK' })
            return;
        }
        res.sendStatus(HttpStatusCodes.NOT_FOUND)
        return;
    })

    // Reserve a bike[input bikeId]
    static reserveBike = asyncHandler(async function usrCtrlReserveBike(req: Request, res: Response, next: NextFunction) {
        const {
            startDate,
            endDate,
            user: {
                _id
            }
        } = req.body
        const { bikeId } = req.params;
        const reserved = await ReservationService.reserveBike(
            new Date(startDate),
            new Date(endDate),
            _id,
            bikeId
        )
        if(reserved){
            res.status(HttpStatusCodes.OK).json({ data: reserved, status: 'OK' })
            return;
        }
        // res.sendStatus(HttpStatusCodes.NOT_FOUND)
        return;
    })

    // Rate a bike(id)
    static rateBike = asyncHandler(async function usrCtrlRateBike(req: Request, res: Response, next: NextFunction) {
        const { rating } = req.body;
        const { bikeId } = req.params;
        const bike = await BikeService.rateBike(rating, bikeId);
        if(bike){
            res.status(HttpStatusCodes.OK).json({ data: bike, status: 'OK' })
            return;
        }
        res.sendStatus(HttpStatusCodes.NOT_FOUND)
        return;
    })

    // Cancel a reservation(id)
    static cancelReservation = asyncHandler(async function usrCtrlCnclReserved(req: Request, res: Response, next: NextFunction){
        const { id } = req.params;
        const deletedReservation = await ReservationService.cancel(id);
        if(deletedReservation){
            res.status(HttpStatusCodes.OK).json({ data: deletedReservation, status: 'OK' })
            return;
        }
        res.sendStatus(HttpStatusCodes.NOT_FOUND)
        return;
    } )

    //All reservation for a user
    static viewUserReservations = asyncHandler(async function usrCtrlViewAllReserved(req: Request, res: Response, next: NextFunction) {
        const { _id: userId } = req.body.user;
        const result = await ReservationService.userReserved(userId);
        if(result){
            res.status(HttpStatusCodes.OK).json({ data: result, status: 'OK' })
            return;
        }
        res.sendStatus(HttpStatusCodes.NOT_FOUND)
        return;
    })
}

export default UserController