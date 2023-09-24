"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertPermission = void 0;
const Permission_js_1 = require("../db/entity/Permission.js");
const insertPermission = async (payload) => {
    try {
        const Permission = Permission_js_1.permission.create({
            name: payload.name
        });
        await Permission.save();
        return Permission;
    }
    catch (error) {
        console.log(error);
        throw ("Something went wrong");
    }
};
exports.insertPermission = insertPermission;
