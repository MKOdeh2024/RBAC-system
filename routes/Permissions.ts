import express from "express";
import { permission } from "../db/entity/Permission";
import { dataSource } from "../db/dataSource";

const permissionRoute = express.Router();

permissionRoute.get('/all', (req, res) => {
    console.log(res.locals.user);
    res.send('All Users');
  });
  
  permissionRoute.get('/:id', (req, res) => {
    res.send('User by ID');
  });
  
  // create permission
  permissionRoute.post('/', async(req, res) => {
    const newPermission = new permission();
    newPermission.name = req.body.name;
    await  dataSource.manager.save(newPermission).then(()=> res.send("Permission create with id : " + newPermission.id))
    .catch((error)=> res.status(500).send("Permission creation failed"));
  });
  
  permissionRoute.put('/:id', (req, res) => {
    res.send('permission Updated');
  });
  
  permissionRoute.delete('/:id', async(req, res) => {
    try {
      const permID = Number(req.params.id);

      // Check if the role exists
      const uniquePerm = await dataSource.manager.findOne(permission, {where:{ id: permID }});
      if (!uniquePerm) {
          return res.status(404).send({ message: "permission not found" });
      }

      // Remove the role
      await dataSource.manager.remove(uniquePerm);

      res.status(200).send({ message: "permission deleted successfully" });
  } catch (error) {
      console.error("Runtime error:", error); // Using console.error for errors
      res.status(500).send({ message: "Internal server error" });
  }
  });
  
  export default permissionRoute;
