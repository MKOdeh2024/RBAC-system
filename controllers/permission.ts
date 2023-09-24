import { user } from "../db/entity/User.js";
import { permission } from "../db/entity/Permission.js";
import NSUser from "../types/User.js";



const insertPermission = async (payload: NSUser.Permission) => {
  try {
    const Permission = permission.create({
      name: payload.name
    });
    await Permission.save();
    return Permission;
  } catch (error) {
    console.log(error);
    throw ("Something went wrong");
  }
}

export {
  insertPermission
}