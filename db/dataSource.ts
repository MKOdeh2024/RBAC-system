import { DataSource} from "typeorm"
import { profile } from "./entity/Profile"
import { permission } from "./entity/Permission"
import { role } from "./entity/Role"
import { user } from "./entity/User"
import "dotenv/config"
import { config } from "process"


export const dataSource = new DataSource({
    type: "mysql",
    host: "Localhost",
    database: "rbac",
    port: 3306,
    username: "root",
    password: "",
    entities: [user,role,profile,permission],
    synchronize: true
});

dataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization : " + err)
    })
