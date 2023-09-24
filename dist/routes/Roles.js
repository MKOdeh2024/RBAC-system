"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Role_1 = require("../db/entity/Role");
const dataSource_1 = require("../db/dataSource");
const Permission_1 = require("../db/entity/Permission");
const roleRoute = express_1.default.Router();
roleRoute.get('/all', (req, res) => {
    res.send('All Roles');
});
roleRoute.get('/:id', (req, res) => {
});
roleRoute.post('/', async (req, res) => {
    const newRole = new Role_1.role();
    newRole.name = req.body.rolename;
    await dataSource_1.dataSource.manager.save(newRole).then(() => res.send("Role create with id : " + newRole.id))
        .catch((error) => res.status(500).send("Role creation failed"));
});
// Assign permission to role
roleRoute.post('/:roleid/:permissionid', async (req, res) => {
    try {
        const roleId = Number(req.params.roleid);
        const permissionId = Number(req.params.permissionid);
        // Check if the role exists
        const uniqueRole = await dataSource_1.dataSource.manager.findOne(Role_1.role, { where: { id: roleId } });
        if (!uniqueRole) {
            return res.status(404).send({ message: "Role not found" });
        }
        // Check if the permission exists
        const uniquePerm = await dataSource_1.dataSource.manager.findOne(Permission_1.permission, { where: { id: permissionId } });
        if (!uniquePerm) {
            return res.status(404).send({ message: "Permission not found" });
        }
        // Assuming 'Permissions' is an array. Add the new permission to it without overwriting existing permissions
        if (Array.isArray(uniqueRole.permissions)) {
            uniqueRole.permissions.push(uniquePerm);
        }
        else {
            uniqueRole.permissions = [uniquePerm];
        }
        // Save the updated role entity
        await dataSource_1.dataSource.manager.save(Role_1.role, uniqueRole);
        res.status(200).send({ message: "Permission assigned to role successfully" });
    }
    catch (error) {
        console.error("Runtime error:", error); // Using console.error for errors
        res.status(500).send({ message: "Internal server error" });
    }
});
roleRoute.put('/:userid', (req, res) => {
    res.send('User Updated');
});
roleRoute.delete('/:id', async (req, res) => {
    try {
        const roleId = Number(req.params.id);
        // Check if the role exists
        const uniqueRole = await dataSource_1.dataSource.manager.findOne(Role_1.role, { where: { id: roleId } });
        if (!uniqueRole) {
            return res.status(404).send({ message: "Role not found" });
        }
        // Remove the role
        await dataSource_1.dataSource.manager.remove(uniqueRole);
        res.status(200).send({ message: "Role deleted successfully" });
    }
    catch (error) {
        console.error("Runtime error:", error); // Using console.error for errors
        res.status(500).send({ message: "Internal server error" });
    }
});
exports.default = roleRoute;
