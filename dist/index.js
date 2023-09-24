"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Users_1 = __importDefault(require("./routes/Users"));
const Roles_1 = __importDefault(require("./routes/Roles"));
const Permissions_1 = __importDefault(require("./routes/Permissions"));
require("mysql");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
app.use("/user", Users_1.default);
app.use("/role", Roles_1.default);
app.use("/permission", Permissions_1.default);
app.listen(port, () => {
    console.log(`app running at port: ${port}`);
});
