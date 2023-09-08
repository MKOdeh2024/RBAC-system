import  express from "express";
import { dataSource } from "./db/dataSource";
import userRoute from "./routes/Users";
import roleRoute from "./routes/Roles";
import permissionRoute from "./routes/Permissions";
import * as dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());

const port = 3000;

app.use("/user",userRoute);
app.use("/role",roleRoute);
app.use("/permission",permissionRoute);



app.listen(port,()=>{
    console.log(`app running at port: ${port}`);
    dataSource.initialize();
    console.log(process.env);
})