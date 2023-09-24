import express, { Router } from "express";
import { user } from "../db/entity/User";
import { profile } from "../db/entity/Profile";
import { dataSource } from "../db/dataSource";
import { role } from "../db/entity/Role";
import { login } from "../controllers/Users";
import { validateUser} from "../validation/Users";
import { In, getRepository } from "typeorm";
var jwt = require('jsonwebtoken');

const userRoute = express.Router();

userRoute.get('/all', async (req, res) => {
  try {
      const users = await dataSource.manager.find(user);
      res.send(users);
  } catch (error) {
      console.error("Runtime error:", error); // Using console.error for errors
      res.status(500).send({ message: "Internal server error" });
  }
});

  
  userRoute.get('/:id', (req, res) => {
    const ID = Number(req.params.id);
    const uniqueUser = dataSource.manager.findOne(user,{where:{id:ID}});
    if(!ID)
    res.status(404).send('Not found');
    else 
    res.send(uniqueUser);

  });
  
  userRoute.post('/signUp', validateUser, async (req, res) => {
    try {

        const newProfile = new profile();
        newProfile.firstName = req.body.firstName;
        newProfile.lastName = req.body.lastName;
        newProfile.dateOfBirth = req.body.dateOfBirth;
        await profile.save(newProfile);

        const newRole = new role();
        newRole.name = req.body.rolename;

        const newUser = new user();
        newUser.userName = req.body.userName;
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        newUser.type = req.body.type;
        newUser.profile = newProfile;
        if (Array.isArray(newUser.Roles)) {
          newUser.Roles.push(newRole);
        } else {
          newUser.Roles = [newRole];
        }
        await user.save(newUser);

        res.send("User created with id: " + newUser.id + 
                 "\nProfile created with id: " + newProfile.id);
    } catch (error) {
        console.log("runtime error: " + error);
        res.status(500).send("An error occurred while creating the user and profile.");
    }
});

  
  userRoute.post('/login',async(req, res) => {
    const userName = req.body.userName;
    const email = req.body.email;
     const password = req.body.password;
     const User = await user.findOneBy({
      userName,
      email,
      password
     }).then((User)=>{
      jwt.sign({
        email: User?.email,
        name: User?.userName,
        displayName : userName.slice(0,5)
      }, process.env.SECRET_KEY,{
        expiresIn: "2w"
      });
      console.log(userName.slice(0,5));
      res.send("logged in successfully :");
     })
     .catch((error)=>{
         res.status(404).send("NO user found with this data");
      });
  });

  // assign role to user
  userRoute.post('/:userid', async(req, res) => {
    try {
      const userID = Number(req.params.userid);
    const newRole =req.body.name;
     const uniqueUser = await dataSource.manager.findOne(user, {where:{ id: userID }});
     if (!uniqueUser) {
      return res.status(404).send({ message: "User not found" });
    }

    if (Array.isArray(uniqueUser.Roles)) {
      uniqueUser.Roles.push(newRole);
    } else {
      uniqueUser.Roles = [newRole];
    }
    // Save the updated user entity
    await dataSource.manager.save(user, uniqueUser);

    res.status(200).send({ message: "Role assigned successfully" });
    } catch (error) {
      console.error("Internal error:", error); // Using console.error for errors
    res.status(500).send({ message: "Internal server error" });
    }
    
    
  });

  // Assign role in database to user
userRoute.post('/:userid/:roleid', async (req, res) => {
  try {
    const userId = Number(req.params.userid);
    const roleId = Number(req.params.roleid);

    // Check if the role exists
    const uniqueRole = await dataSource.manager.findOne(role, {where:{ id: roleId }});
    if (!uniqueRole) {
      return res.status(404).send({ message: "Role not found" });
    }

    // Check if the user exists
    const uniqueUser = await dataSource.manager.findOne(user, {where:{ id: userId }});
    if (!uniqueUser) {
      return res.status(404).send({ message: "User not found" });
    }

    // Assuming 'Roles' is an array. Add the new role to it without overwriting existing roles
    if (Array.isArray(uniqueUser.Roles)) {
      uniqueUser.Roles.push(uniqueRole);
    } else {
      uniqueUser.Roles = [uniqueRole];
    }

    // Save the updated user entity
    await dataSource.manager.save(user, uniqueUser);

    res.status(200).send({ message: "Role assigned successfully" });
  } catch (error) {
    console.error("Internal error:", error); // Using console.error for errors
    res.status(500).send({ message: "Internal server error" });
  }
});

  
  

userRoute.delete('/:id', async (req, res) => {
  try {
      const userId = Number(req.params.id);

      // Check if the user exists
      const uniqueUser = await dataSource.manager.findOne(user, {where:{ id: userId }});
      if (!uniqueUser) {
          return res.status(404).send({ message: "User not found" });
      }

      // Remove the user
      await dataSource.manager.remove(uniqueUser);

      res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
      console.error("Runtime error:", error); // Using console.error for errors
      res.status(500).send({ message: "Internal server error" });
  }
});

  
  export default userRoute;
