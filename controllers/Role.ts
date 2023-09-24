
import { permission } from "../db/entity/Permission.js";
import { In } from "typeorm";
import { user } from "../db/entity/User.js";
import { role } from "../db/entity/Role.js";
import NSUser from "../types/User.js";



const insertRole = async (payload: NSUser.Role) => {
  try {
    const Role = new role();
    Role.name = payload.name;
    Role.permissions = await permission.findBy({
      id: In(payload.permissions)
    });
    await Role.save();
    return Role;
  } catch (error) {
    console.log(error);

    throw ("Something went wrong");
  }
}

const assignRole = async(payload:any) => {
    try {
      let Role: any = await role.findOneBy({
        name:payload.name
      })
      if(role){
        const User = new user();
        User.Roles.push(Role);
        await User.save();
        return User;  
      }
      else return false;
    } catch (error) {
      throw ("Something went wrong");
    }
  }
  
  


export {
  insertRole,
  assignRole
}