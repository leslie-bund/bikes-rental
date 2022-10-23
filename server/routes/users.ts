import express, { Request, Response } from "express";
import { ValidationService, AuthService } from "../services";
import ManagerController from "../controllers/manager.controller";
var router = express.Router();

/* POST login manager. */
router.post('/login', ValidationService.validateLogin, ManagerController.login );

/** POST sign up manager */
router.post('/create', ValidationService.validateSignUp, ManagerController.signUp)

router.use(AuthService.useAuth);
router.use(AuthService.managerAuthGuard);

/** PATCH edit a user */
router.patch('/edit-user/:userId', ValidationService.validateUserEdit, ManagerController.editUser)
/** DELETE a user */
router.delete('/del-user/:userId', ManagerController.deleteUser);
/** GET single user */
router.get('/get-user/:userId', ManagerController.viewUser)

/** POST create a bike */
router.post('/create-bike', ValidationService.validateBikeEntry, ManagerController.createBike);
/** GET view/read a bike */
router.get('/get-bike/:bikeId', ManagerController.viewBike);
/** PATCH edit a bike */
router.patch('/edit-bike/:bikeId', ValidationService.validateBikeEntry, ManagerController.editBike)
/** DELETE a bike */
router.delete('/del-bike/:bikeId', ManagerController.deleteBike)

/** GET all reservations
 *  Route takes query "mode" e.g. ../reservations?mode=[users or bikes]
 */
router.get('/reservations', ManagerController.allReservations)


export default router;
