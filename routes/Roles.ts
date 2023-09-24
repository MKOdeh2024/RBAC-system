import express from "express";
import { role } from "../db/entity/Role";
import { dataSource } from "../db/dataSource";
import permissionRoute from "./Permissions";
import { permission } from "../db/entity/Permission";

const roleRoute = express.Router();

roleRoute.get('/all', (req, res) => {
    res.send('All Roles');
  });
  
  roleRoute.get('/:id', (req, res) => {
  });
  
  roleRoute.post('/', async(req, res) => {
    const newRole = new role();
    newRole.name = req.body.rolename;
    await  dataSource.manager.save(newRole).then(()=> res.send("Role create with id : " + newRole.id))
    .catch((error)=> res.status(500).send("Role creation failed"));
  });
  
  // Assign permission to role
roleRoute.post('/:roleid/:permissionid', async (req, res) => {
  try {
      const roleId = Number(req.params.roleid);
      const permissionId = Number(req.params.permissionid);

      // Check if the role exists
      const uniqueRole = await dataSource.manager.findOne(role, {where:{ id: roleId }});
      if (!uniqueRole) {
          return res.status(404).send({ message: "Role not found" });
      }

      // Check if the permission exists
      const uniquePerm = await dataSource.manager.findOne(permission,{ where:{ id: permissionId }});
      if (!uniquePerm) {
          return res.status(404).send({ message: "Permission not found" });
      }

      // Assuming 'Permissions' is an array. Add the new permission to it without overwriting existing permissions
      if (Array.isArray(uniqueRole.permissions)) {
          uniqueRole.permissions.push(uniquePerm);
      } else {
          uniqueRole.permissions = [uniquePerm];
      }

      // Save the updated role entity
      await dataSource.manager.save(role, uniqueRole);

      res.status(200).send({ message: "Permission assigned to role successfully" });
  } catch (error) {
      console.error("Runtime error:", error); // Using console.error for errors
      res.status(500).send({ message: "Internal server error" });
  }
});


  roleRoute.put('/:userid', (req, res) => {
    res.send('User Updated');
  });
  
  roleRoute.delete('/:id', async (req, res) => {
    try {
        const roleId = Number(req.params.id);

        // Check if the role exists
        const uniqueRole = await dataSource.manager.findOne(role, {where:{ id: roleId }});
        if (!uniqueRole) {
            return res.status(404).send({ message: "Role not found" });
        }

        // Remove the role
        await dataSource.manager.remove(uniqueRole);

        res.status(200).send({ message: "Role deleted successfully" });
    } catch (error) {
        console.error("Runtime error:", error); // Using console.error for errors
        res.status(500).send({ message: "Internal server error" });
    }
});

  
  export default roleRoute;
