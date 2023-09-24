"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const isEmail_js_1 = __importDefault(require("validator/lib/isEmail.js"));
const validateUser = (req, res, next) => {
    const values = ['userName', 'email', 'password', 'type'];
    const user = req.body;
    const errorList = [];
    // const errorList = values.map(key => !user[key] && `${key} is Required!`).filter(Boolean);
    values.forEach(key => {
        if (!user[key]) {
            return errorList.push(`${key} is Required!`);
        }
    });
    if (!(0, isEmail_js_1.default)(user.email)) {
        errorList.push('Email is not Valid');
    }
    if (user.password.length < 6) {
        errorList.push('Password should contain at least 6 characters!');
    }
    if (!['employee', 'employer', 'admin', 'editor', 'user'].includes(user.type)) {
        errorList.push('User type unknown!');
    }
    if (errorList.length) {
        res.status(400).send(errorList);
    }
    else {
        next();
    }
};
exports.validateUser = validateUser;
