import express, { Request, Response } from "express";
var router = express.Router();

/* GET users listing. */
router.get('/', function(req: Request, res: Response) {
  res.json({ message: 'respond with a resource' });
});

/**
 * Login -> login controller
 * 
 * Create Manager -> signupcontroller(sets role to manager)
 * Create Bike -> Bike repository;
 * View bike, Edit bike, Delete bike;
 * 
 * view all reservations
 * -- All users that reserved & dates
 * -- All bikes reserved & dates
 * 
 */

export default router;
