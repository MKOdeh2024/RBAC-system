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
    newRole.name = req.body.name;
    await  dataSource.manager.save(newRole).then(()=> res.send("Role create with id : " + newRole.id))
    .catch((error)=> res.status(500).send("Role creation failed"));
  });
  
  // assign permission to role
  roleRoute.post('/:roleid/:permissionid', async(req, res) => {
    const roleId = Number(req.params.roleid);
    const permissionID = Number(req.params.permissionid);
    const uniqueRole = dataSource.manager.findOneBy(role,{id: roleId});
    const uniquePerm = dataSource.manager.findOneBy(permission,{id: permissionID});
    await dataSource
    .createQueryBuilder()
    .update(uniqueRole)
    .set({
        Permissions : [uniquePerm]
    })
    .where("id = :id", { id: permissionID })
    .execute().then((unigueRole)=>{
      res.send("Role updated  successfully :" + unigueRole);
     })
     .catch((error)=>{
         res.status(404).send("NO Role found with this data");
      })
  });

  roleRoute.put('/:userid', (req, res) => {
    res.send('User Updated');
  });
  
  roleRoute.delete('/:id', async(req, res) => {
    const ID = Number(req.params.id);
    const unigueRole = dataSource.manager.findOneBy(role,{id:ID});
    await dataSource.manager.remove(unigueRole).then(()=> res.send("Role Deleted"))
    .catch((error)=> res.status(404).send("Not found"));

  });
  
  export default roleRoute;
