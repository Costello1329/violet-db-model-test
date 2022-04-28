import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Table } from "./table.entity";

@Entity()
export class WorkSpace {
    @PrimaryGeneratedColumn()
    public id: string;

    @OneToMany(() => Table, table => table.workSpace)
    public tables: Table[];

    @Column()
    public name: string;
}
