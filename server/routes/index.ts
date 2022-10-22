import express, { Request, Response } from "express";
var router = express.Router();

/* GET users listing. */
router.get('/', function(req: Request, res: Response) {
  res.json({ title: 'Welcome to Express' });
});

/**
 * Login route -> login controller
 * Sign up route -> signup controller (sets role to user)
 * 
 * View user, Edit user, Delete user
 * 
 * Reserve bike(spec time) -> bikecontroller.reserve
 * Rate bike(1 - 5) -> bikecontroller.rate
 * Cancel reservation -> reservationcontroller.cancel
 * Available bikes(spec date) -> reservationcontroller.list
*/

export default router;
