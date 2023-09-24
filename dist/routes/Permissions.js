"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Permission_1 = require("../db/entity/Permission");
const dataSource_1 = require("../db/dataSource");
const permissionRoute = express_1.default.Router();
permissionRoute.get('/all', (req, res) => {
    console.log(res.locals.user);
    res.send('All Users');
});
permissionRoute.get('/:id', (req, res) => {
    res.send('User by ID');
});
// create permission
permissionRoute.post('/', async (req, res) => {
    const newPermission = new Permission_1.permission();
    newPermission.name = req.body.name;
    await dataSource_1.dataSource.manager.save(newPermission).then(() => res.send("Permission create with id : " + newPermission.id))
        .catch((error) => res.status(500).send("Permission creation failed"));
});
permissionRoute.put('/:id', (req, res) => {
    res.send('permission Updated');
});
permissionRoute.delete('/:id', async (req, res) => {
    try {
        const permID = Number(req.params.id);
        // Check if the role exists
        const uniquePerm = await dataSource_1.dataSource.manager.findOne(Permission_1.permission, { where: { id: permID } });
        if (!uniquePerm) {
            return res.status(404).send({ message: "permission not found" });
        }
        // Remove the role
        await dataSource_1.dataSource.manager.remove(uniquePerm);
        res.status(200).send({ message: "permission deleted successfully" });
    }
    catch (error) {
        console.error("Runtime error:", error); // Using console.error for errors
        res.status(500).send({ message: "Internal server error" });
    }
});
exports.default = permissionRoute;
