import { NextFunction } from "express";
import { dataSource } from "../db/dataSource"
import { role} from "../db/entity/Role";
import { user } from "../db/entity/User";
import  NSUser  from "../types/User";
import bcrypt from 'bcrypt';
import { profile } from "../db/entity/Profile";
import { In } from "typeorm";

var jwt = require('jsonwebtoken');

const insertUser = async(payload: NSUser.Item) => {
  try {
    const User = new user();
    User.userName = payload.userName;
    User.email = payload.email;
    User.password = payload.password;
    User.Roles = await role.findBy({
      id: In(payload.role)
    });
    await User.save();
    return User;  
  } catch (error) {
    throw ("Something went wrong");
  }
}

const getUser = (userName:string) => {
  return user.findBy({
    userName:userName
  });
}




const login = async (email: string, password: string) => {
   try {
     const User = await user.findOneBy({
       email
     });
 
     const passwordMatching = await bcrypt.compare(password, User?.password || '');
 
     if (User && passwordMatching) {
       const token = jwt.sign(
         {
           email: User.email,
           userName: User.userName
         },
         process.env.SECRET_KEY || '',
         {
           expiresIn: "2w"
         }
       );
 
       return token;
     } else {
       throw ("Invalid Username or password!");
     }
   } catch (error) {
     throw ("Invalid Username or password!");
   }
 }
 

const  authenticateToken = (req:any,res : any,next : NextFunction) =>{
   const token = req.headers['authorization'];
 
   if (!token) {
     return res.status(401).json({ message: 'Token is required' });
   }
 
   jwt.verify(token, process.env.SECRET_KEY, (err:any, user: NSUser.Item) => {
     if (err) {
       return res.status(403).json({ message: 'Invalid token' });
     }
     req.user = user;
     next();
   });
 }

export {authenticateToken, login, 
  insertUser,
  getUser
}