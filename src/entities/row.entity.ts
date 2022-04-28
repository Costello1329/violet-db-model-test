import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Table } from "./table.entity";

@Entity()
export class Row {
    @PrimaryGeneratedColumn()
    public id: string;

    @ManyToOne(() => Table, table => table.rows)
    public table: Table;

    @Column()
    public idx: number;
}
