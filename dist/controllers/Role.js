"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignRole = exports.insertRole = void 0;
const Permission_js_1 = require("../db/entity/Permission.js");
const typeorm_1 = require("typeorm");
const User_js_1 = require("../db/entity/User.js");
const Role_js_1 = require("../db/entity/Role.js");
const insertRole = async (payload) => {
    try {
        const Role = new Role_js_1.role();
        Role.name = payload.name;
        Role.permissions = await Permission_js_1.permission.findBy({
            id: (0, typeorm_1.In)(payload.permissions)
        });
        await Role.save();
        return Role;
    }
    catch (error) {
        console.log(error);
        throw ("Something went wrong");
    }
};
exports.insertRole = insertRole;
const assignRole = async (payload) => {
    try {
        let Role = await Role_js_1.role.findOneBy({
            name: payload.name
        });
        if (Role_js_1.role) {
            const User = new User_js_1.user();
            User.Roles.push(Role);
            await User.save();
            return User;
        }
        else
            return false;
    }
    catch (error) {
        throw ("Something went wrong");
    }
};
exports.assignRole = assignRole;
