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
    res.send('User Updated');
  });
  
  permissionRoute.delete('/:id', (req, res) => {
    res.send('User Deleted');
  });
  
  export default permissionRoute;
