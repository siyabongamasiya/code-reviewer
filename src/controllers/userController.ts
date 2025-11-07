import {Response,Request} from "express";
import * as userService from "../services/userService";


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        res.status(200).json(await userService.getAllUsers());
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
}
export const getUserById = async (req: Request, res: Response) => {
    const id : number = parseInt(req.params.id);

    try {
        res.status(200).json(await userService.getUserById(id));
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error });
    }
}