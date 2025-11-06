import express,{Express,Response,Request, NextFunction} from "express";

const app = express()


export const notFoundError = (req :Request,res :Response,next:NextFunction) => {
    res.status(404).json({
        message:"not found",
    })
    next()
}
