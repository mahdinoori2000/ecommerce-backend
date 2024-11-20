import { Request, Response } from "express";
import AuthService from "./auth.service";
import { IUser } from "../../modules/user/user.interface";
import catchAsyncErrors from "../../middlewares/asyncErrorMiddleware";
import NotFoundError from "../../errors/notFound.error";
import clientResponse from "../../utils/successResponse";

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

    //  Signs up a new user.
    signUp = catchAsyncErrors(async (req: Request, res: Response): Promise<void> => {
        const user = await this.authService.signUp(req.body as Partial<IUser>);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        
        clientResponse(res, user);
    });

    signIn = catchAsyncErrors(async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;
        const user = await this.authService.signIn(email, password);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        clientResponse(res, user);
    });
}

export default AuthController;