import e, { Request, Response, NextFunction } from 'express';
import CustomError from '../errors/custom.error';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status((err as CustomError).statusCode).send({ errors: (err as CustomError).serializeErrors() });
  }

  console.error(err);
  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};

export default errorHandler;