import { NextFunction, Request, Response } from "express";
import AuthService from "./auth.service";
import { IUser } from "../../modules/user/user.interface";
import catchAsyncErrors from "../../middlewares/asyncErrorMiddleware";
import NotFoundError from "../../errors/notFound.error";
import clientResponse from "../../utils/successResponse";
import { createJwt } from "@utils/jwtHelper";

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

    //  Signs up a new user.
    signUp = catchAsyncErrors(async (req: Request, res: Response): Promise<void> => {
        const user = await this.authService.signUp(req.body as Partial<IUser>);
        // Check if user is not found
        if (!user) {
            throw new NotFoundError('User not found');
        }
        
        clientResponse(res, user);
    });

    signIn = catchAsyncErrors(async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;
        const user = await this.authService.signIn(email, password);
        // Check if user is not found
        if (!user) {
            throw new NotFoundError('User not found');
        }
        // Create a payload for the JWT
        const payload = {
            id: user._id,
            email: user.email,
            role: user.role,
        };
        // Create Token inside a cookie
        createJwt(req, res, payload);
        clientResponse(res, user);
    });

    //  Signs out a user.
    signOut = catchAsyncErrors(async (req: Request, res: Response): Promise<void> => {
        const message = 'User signed out successfully';
        res.clearCookie('token');
        clientResponse(res, null, message, 204);
    });

    //  Updates the password of a user.
    updatePassword = catchAsyncErrors(async (req: Request, res: Response): Promise<void> => {
        const { userId, password } = req.body;
        await this.authService.updatePassword(userId, password);
        const message = 'Password updated successfully';
        clientResponse(res, null, message, 204);
    });

    restirctTo = (...roles: string[]) => {
        return (req: Request, res: Response, next: any) => {
            if (!req.currentUser || !roles.includes(req.currentUser.role)) {
                throw new Error('You do not have permission to perform this action');
            }
            next();
        };
    }

    forgotPassword = catchAsyncErrors(async (req: Request, res: Response): Promise<void> => {
        const { email } = req.body;
        await this.authService.forgotPassword(email);
        const message = 'Password reset token sent to email';
        clientResponse(res, null, message, 200);
    });

    resetPassword = catchAsyncErrors(async (req: Request, res: Response): Promise<void> => {
        const { token } = req.params;
        const { password } = req.body;
        await this.authService.resetPassword(token, password);
        const message = 'Password reset successfully';
        clientResponse(res, null, message, 204);
    });

    activateAccount = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
        const { token } = req.params;
        if (!token) {
            throw new NotFoundError("Invalid token");
        }

        const user = await this.authService.activateAccount(token);
    })
}

export default AuthController;