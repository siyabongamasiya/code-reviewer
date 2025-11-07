import { Router } from "express";
import { protect } from "../middleware/authMiddleWare";

const submissionRoutes = Router();
submissionRoutes.use(protect)


submissionRoutes.get("/",() => {
    console.log("hooray!!..you are now authorized!!")
})

export default submissionRoutes;