import express,{Express,Response,Request, NextFunction} from "express";

const app = express()


export interface AppError extends Error {
  statusCode?: number;
  details?: any;
}

export const notFoundError = (req :Request,res :Response,next:NextFunction) => {
    res.status(404).json({
        message:"not found",
    })
    next()
}




export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error('Error:', err.message);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message:
      err.message || 'Internal Server Error. Please try again later.',
    details: err.details || null,
  });
}