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
    newRole.name = req.body.name;
    await dataSource_1.dataSource.manager.save(newRole).then(() => res.send("Role create with id : " + newRole.id))
        .catch((error) => res.status(500).send("Role creation failed"));
});
// assign permission to role
roleRoute.post('/:roleid/:permissionid', async (req, res) => {
    const roleId = Number(req.params.roleid);
    const permissionID = Number(req.params.permissionid);
    const uniqueRole = dataSource_1.dataSource.manager.findOneBy(Role_1.role, { id: roleId });
    const uniquePerm = dataSource_1.dataSource.manager.findOneBy(Permission_1.permission, { id: permissionID });
    await dataSource_1.dataSource
        .createQueryBuilder()
        .update(uniqueRole)
        .set({
        Permissions: [uniquePerm]
    })
        .where("id = :id", { id: permissionID })
        .execute().then((unigueRole) => {
        res.send("Role updated  successfully :" + unigueRole);
    })
        .catch((error) => {
        res.status(404).send("NO Role found with this data");
    });
});
roleRoute.put('/:userid', (req, res) => {
    res.send('User Updated');
});
roleRoute.delete('/:id', async (req, res) => {
    const ID = Number(req.params.id);
    const unigueRole = dataSource_1.dataSource.manager.findOneBy(Role_1.role, { id: ID });
    await dataSource_1.dataSource.manager.remove(unigueRole).then(() => res.send("Role Deleted"))
        .catch((error) => res.status(404).send("Not found"));
});
exports.default = roleRoute;
