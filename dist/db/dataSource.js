"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const Profile_1 = require("./entity/Profile");
const Permission_1 = require("./entity/Permission");
const Role_1 = require("./entity/Role");
const User_1 = require("./entity/User");
require("dotenv/config");
exports.dataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "Localhost",
    database: "rbac",
    port: 3306,
    username: "root",
    password: "",
    entities: [User_1.user, Role_1.role, Profile_1.profile, Permission_1.permission],
    synchronize: true
});
exports.dataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization : " + err);
});
