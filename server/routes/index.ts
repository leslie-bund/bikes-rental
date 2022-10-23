import express, { Request, Response } from "express";
import { ValidationService, AuthService } from "../services";
import UserController from "../controllers/user.controller";
// const debug = require('debug')('easy-bikes:server');
var router = express.Router();

/* POST users listing. */
router.post('/login', ValidationService.validateLogin, UserController.login);
/** POST signup new user */
router.post('/signup', ValidationService.validateSignUp, UserController.signUp);


router.use(AuthService.useAuth);
// router.use(AuthService.userAuthGuard);

/**
 * Login route -> login controller
 * Sign up route -> signup controller (sets role to user)
 * 
 * Reserve bike(spec time) -> bikecontroller.reserve
 * Rate bike(1 - 5) -> bikecontroller.rate
 * Cancel reservation -> reservationcontroller.cancel
 * Available bikes(spec date) -> reservationcontroller.list
*/

/**POST reserve a bike */
router.post('/reserve-bike/:bikeId', ValidationService.validateReservation, UserController.reserveBike);

/**PATCH rate a bike */
router.patch('/rate-bike/:bikeId', ValidationService.validateRating, UserController.rateBike)

/**DELETE cancel a reservation */
router.delete('/cancel-reserve/:id', UserController.cancelReservation);

/**GET available bikes from date */
router.get('/available-bikes', ValidationService.validateDate, UserController.availableBikesByDate)

export default router;
