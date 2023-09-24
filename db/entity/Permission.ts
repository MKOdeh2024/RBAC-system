import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class permission extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({nullable : false, unique: true})
    name: string
}