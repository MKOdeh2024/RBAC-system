"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.insertUser = exports.login = exports.authenticateToken = void 0;
const Role_1 = require("../db/entity/Role");
const User_1 = require("../db/entity/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const typeorm_1 = require("typeorm");
var jwt = require('jsonwebtoken');
const insertUser = async (payload) => {
    try {
        const User = new User_1.user();
        User.userName = payload.userName;
        User.email = payload.email;
        User.password = payload.password;
        User.Roles = await Role_1.role.findBy({
            id: (0, typeorm_1.In)(payload.role)
        });
        await User.save();
        return User;
    }
    catch (error) {
        throw ("Something went wrong");
    }
};
exports.insertUser = insertUser;
const getUser = (userName) => {
    return User_1.user.findBy({
        userName: userName
    });
};
exports.getUser = getUser;
const login = async (email, password) => {
    try {
        const User = await User_1.user.findOneBy({
            email
        });
        const passwordMatching = await bcrypt_1.default.compare(password, User?.password || '');
        if (User && passwordMatching) {
            const token = jwt.sign({
                email: User.email,
                userName: User.userName
            }, process.env.SECRET_KEY || '', {
                expiresIn: "2w"
            });
            return token;
        }
        else {
            throw ("Invalid Username or password!");
        }
    }
    catch (error) {
        throw ("Invalid Username or password!");
    }
};
exports.login = login;
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Token is required' });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;
