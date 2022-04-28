import { Column as OrmColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ColumnType } from "./columntype.entity";
import { Table } from "./table.entity";

@Entity()
export class Column {
    @PrimaryGeneratedColumn()
    public id: string;

    @ManyToOne(() => Table, table => table.columns)
    public table: Table;

    @ManyToOne(() => ColumnType, columnType => columnType.columns)
    public columnType: ColumnType;

    @OrmColumn()
    public idx: number;

    @OrmColumn()
    public name: string;
}
