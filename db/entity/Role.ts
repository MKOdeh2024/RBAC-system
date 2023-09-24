import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable } from "typeorm"
import { permission } from "./Permission"
import { user } from "./User"

@Entity()
export class role extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({nullable : false, unique: true})
    name: string


    @ManyToMany(() => permission,{cascade: true, eager: true})
    @JoinTable()
    permissions: permission[]
}