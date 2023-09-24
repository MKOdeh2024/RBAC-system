import { role } from "../db/entity/Role";
import { permission } from "../db/entity/Permission";

 namespace NSUser{
    export enum Type {
        company = 'employer',
        employee = 'employee',
        admin = 'admin',
        editor = 'editor',
        user = 'user'
      } 
    export interface Item extends Request {
        userName: string,
        email : string,
        password : string,
        firstName : string | null,
        lastName  :string | null,
        dateOfBirth : string | null,
        type: Type,
        role: role[]

    }

    export interface Role {
      id: number;
      name: string;
      permissions: number[];
    }
  
    export interface Permission {
      id: number;
      name: string;
    }
  
    export interface Profile {
      id: number;
      firstName: string;
      lastName: string;
      dateOfBirth: Date;
    }
}

export default NSUser