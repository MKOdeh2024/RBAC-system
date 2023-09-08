import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm"
import { profile } from "./Profile"
import { role } from "./Role"

@Entity("users")
export class user extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({length : 30 ,nullable : false})
    userName: string

    @Column({nullable: false})
    email: string

    @Column({nullable: false})
    password: string

    @OneToOne(() => profile)
    @JoinColumn()
    profile: profile

    @ManyToMany(() => role)
    @JoinTable()
    Roles: role[]
}