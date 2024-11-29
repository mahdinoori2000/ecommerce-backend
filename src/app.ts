import express, {Request, Response, NextFunction} from 'express';
import errorHandler from './middlewares/errorMiddleware';
import { authRoutes } from './modules/auth/auth.routes';
import globalMiddlewares from './middlewares/globalMiddleware';
import requireAuth from './middlewares/requireAuthMiddleware';
import currentUserMiddleware from './middlewares/currentUserMiddleware';
import NotFoundError from './errors/notFound.error';

const app = express()

globalMiddlewares(app);

app.use(currentUserMiddleware);

app.use("/auth", authRoutes);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

app.all("*", (req: Request, res: Response) => {
  throw new NotFoundError(`Can't find ${req.originalUrl} on this server!`);
})

export default app;