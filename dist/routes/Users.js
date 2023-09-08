"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = require("../db/entity/User");
const Profile_1 = require("../db/entity/Profile");
const dataSource_1 = require("../db/dataSource");
const Role_1 = require("../db/entity/Role");
var jwt = require('jsonwebtoken');
const userRoute = express_1.default.Router();
userRoute.get('/all', (req, res) => {
    const users = dataSource_1.dataSource.manager.find(User_1.user);
    res.send(users);
});
userRoute.get('/:id', (req, res) => {
    const ID = Number(req.params.id);
    const unigueUser = dataSource_1.dataSource.manager.findOneBy(User_1.user, { id: ID });
    if (!ID)
        res.status(404).send('Not found');
    else
        res.send(unigueUser);
});
userRoute.post('/signUp', async (req, res) => {
    const newUser = new User_1.user();
    newUser.userName = req.body.userName;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    const newProfile = new Profile_1.profile();
    newProfile.firstName = req.body.firstName;
    newProfile.lastName = req.body.lastName;
    newProfile.dateOfBirth = req.body.dateOfBirth;
    newUser.profile = newProfile;
    await dataSource_1.dataSource.manager.save(newUser).then(() => res.send("User create with id : " + newUser.id))
        .catch((error) => res.status(500).send("user creation failed"));
    await dataSource_1.dataSource.manager.save(newProfile).then(() => res.send("Profile create with id : " + newProfile.id))
        .catch((error) => res.status(500).send("user creation failed"));
});
userRoute.post('/login', async (req, res) => {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    const User = await dataSource_1.dataSource.manager.findOneBy(User_1.user, {
        userName,
        email,
        password
    }).then((User) => {
        jwt.sing({
            email: User?.email,
            name: User?.userName
        }, "lsdafmf94034394999+fdgrrd$22334eklkffd", {
            expiresIn: "5m"
        });
        res.send("logged in successfully :");
    })
        .catch((error) => {
        res.status(404).send("NO user found with this data");
    });
});
// assign role to user
userRoute.post('/:userid/:roleid', async (req, res) => {
    const userID = Number(req.params.userid);
    const roleId = Number(req.params.roleid);
    const uniqueRole = dataSource_1.dataSource.manager.findOneBy(Role_1.role, { id: roleId });
    const uniqueUser = dataSource_1.dataSource.manager.findOneBy(User_1.user, { id: userID });
    await dataSource_1.dataSource
        .createQueryBuilder()
        .update(uniqueUser)
        .set({
        Roles: [uniqueRole]
    })
        .where("id = :id", { id: userID })
        .execute();
});
userRoute.delete('/:id', async (req, res) => {
    const ID = Number(req.params.id);
    const unigueUser = dataSource_1.dataSource.manager.findOneBy(User_1.user, { id: ID });
    await dataSource_1.dataSource.manager.remove(unigueUser).then(() => res.send("User Deleted"))
        .catch((error) => res.status(404).send("Not found"));
});
exports.default = userRoute;
