import express, { Request, Response } from "express";
var router = express.Router();

/* GET users listing. */
router.get('/', function(req: Request, res: Response) {
  res.json({ title: 'Welcome to Express' });
});

export default router;
