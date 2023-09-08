import express, { Router } from "express";
import { user } from "../db/entity/User";
import { profile } from "../db/entity/Profile";
import { dataSource } from "../db/dataSource";
import { role } from "../db/entity/Role";
var jwt = require('jsonwebtoken');

const userRoute = express.Router();

userRoute.get('/all', (req, res) => {
    const users = dataSource.manager.find(user);
    res.send(users);
  });
  
  userRoute.get('/:id', (req, res) => {
    const ID = Number(req.params.id);
    const unigueUser = dataSource.manager.findOneBy(user,{id:ID});
    if(!ID)
    res.status(404).send('Not found');
    else 
    res.send(unigueUser);

  });
  
  userRoute.post('/signUp', async(req, res) => {
    const newUser = new user();
    newUser.userName = req.body.userName;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    const newProfile = new profile();
    newProfile.firstName = req.body.firstName;
    newProfile.lastName = req.body.lastName;
    newProfile.dateOfBirth = req.body.dateOfBirth;
    newUser.profile = newProfile;
    await dataSource.manager.save(newUser).then(()=> res.send("User create with id : " + newUser.id))
    .catch((error)=> res.status(500).send("user creation failed"));
    await dataSource.manager.save(newProfile).then(()=> res.send("Profile create with id : " + newProfile.id))
    .catch((error)=> res.status(500).send("user creation failed"));

  });
  
  userRoute.post('/login', async(req, res) => {
    const userName = req.body.userName;
    const email = req.body.email;
     const password = req.body.password;
     const User = await dataSource.manager.findOneBy(user, {
      userName,
      email,
      password
     }).then((User)=>{
      jwt.sing({
        email: User?.email,
        name: User?.userName
      }, "lsdafmf94034394999+fdgrrd$22334eklkffd",{
        expiresIn: "5m"
      });
      res.send("logged in successfully :");
     })
     .catch((error)=>{
         res.status(404).send("NO user found with this data");
      });
  });

  // assign role to user
  userRoute.post('/:userid/:roleid', async(req, res) => {
    const userID = Number(req.params.userid);
    const roleId = Number(req.params.roleid);
    const uniqueRole = dataSource.manager.findOneBy(role,{id: roleId});
    const uniqueUser = dataSource.manager.findOneBy(user,{id: userID});
    await dataSource
    .createQueryBuilder()
    .update(uniqueUser)
    .set({
        Roles : [uniqueRole]
    })
    .where("id = :id", { id: userID })
    .execute()
  });
  
  

  userRoute.delete('/:id', async(req, res) => {
    const ID = Number(req.params.id);
    const unigueUser = dataSource.manager.findOneBy(user,{id:ID});
    await dataSource.manager.remove(unigueUser).then(()=> res.send("User Deleted"))
    .catch((error)=> res.status(404).send("Not found"));

  });
  
  export default userRoute;
