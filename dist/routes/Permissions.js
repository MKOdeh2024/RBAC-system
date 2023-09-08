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
    res.send('User Updated');
});
permissionRoute.delete('/:id', (req, res) => {
    res.send('User Deleted');
});
exports.default = permissionRoute;
