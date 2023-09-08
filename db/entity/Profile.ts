import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class profile extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({length : 20 ,nullable : false})
    firstName: string

    @Column({length : 20 ,nullable : false})
    lastName: string

    @Column()
    dateOfBirth: Date

}