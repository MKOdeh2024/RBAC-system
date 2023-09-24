import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class profile extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({length : 20})
    firstName: string

    @Column({length : 20})
    lastName: string

    @Column({nullable: true})
    dateOfBirth: string

}