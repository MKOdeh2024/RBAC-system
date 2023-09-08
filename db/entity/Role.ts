import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, JoinTable } from "typeorm"
import { permission } from "./Permission"
import { user } from "./User"

@Entity()
export class role extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({nullable : false})
    name: string
    @ManyToMany(() => permission)
    @JoinTable()
    permissions: permission[]
}