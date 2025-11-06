import express,{Express,Response,Request} from "express";
import dotenv from "dotenv";
import { testConnection } from "./config/database";

dotenv.config();

const app : Express= express();
const PORT = process.env.PORT || 4040;

app.use(express.json());

app.get('/', (req : Request, res : Response) => {
  res.send('Welcome to the code collaboration review platform!')
})


const startServer = async () => {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
  });
};

startServer()