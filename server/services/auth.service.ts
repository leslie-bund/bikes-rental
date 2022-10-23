import express, { Request, Response, NextFunction } from "express";
import HttpStatusCodes from "../configurations/HttpStatusCodes";
import { RouteError } from "../declarations/classes";
import jwtUtil from "../util/jwt-util";
import userRepo from "../repos/user";


interface IUser {
    password?: string;
    name?: string;
    email?: string;
    role?: string;
}
interface Ifilter {
    [k: string]: string | Date | Ifilter | number | unknown;
}

class AuthService {
  static async useAuth(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization !== undefined) {
      let token = req.headers.authorization.startsWith("Bearer")
        ? req.headers.authorization.split(" ")[1]
        : req.headers.authorization;
      try {
        const payload = await jwtUtil.decode(token);
        if (payload instanceof Object) {
          const result = await userRepo.getOne<IUser>(
            payload as unknown as Ifilter
          );
          if (!result) {
            throw new Error("User not found");
          } else {
            req.body.user = result;
            next();
          }
        } else {
          throw new Error("Invalid Token supplied");
        }
      } catch (error: any) {
        next(new RouteError(HttpStatusCodes.FORBIDDEN, error?.message));
      }
    } else {
      next(
        new RouteError(HttpStatusCodes.FORBIDDEN, "Not authorized, no token")
      );
    }
  }

//   static async userAuthGuard(req: Request, res: Response, next: NextFunction){
//     if(req.body?.user?.role === 'user') {
//         next()
//     } else {
//         next(new RouteError(HttpStatusCodes.MISDIRECTED_REQUEST, "You\'re not a user"))
//     }
//   }


  static async managerAuthGuard(req: Request, res: Response, next: NextFunction){
    if(req.body?.user?.role === 'manager') {
        next()
    } else {
        next(new RouteError(HttpStatusCodes.MISDIRECTED_REQUEST, "You\'re not a manager"))
    }
  }

}

export default AuthService;
