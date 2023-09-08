import { DataSource} from "typeorm"
import { profile } from "./entity/Profile"
import { permission } from "./entity/Permission"
import { role } from "./entity/Role"
import { user } from "./entity/User"

export const dataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    database: "rbac",
    port: 3306,
    username: "root",
    password: "",
    entities: [user,role,profile,permission],
    synchronize: false
});

dataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })