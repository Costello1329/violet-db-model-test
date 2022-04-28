import { Column as OrmColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Row } from "./row.entity";
import { Column } from "./column.entity";
import { Table } from "./table.entity";

@Entity()
export class Field {
    @PrimaryGeneratedColumn()
    public id: string;
    
    @ManyToOne(() => Table)
    public table: Table;

    @ManyToOne(() => Row)
    public row: Row;

    @ManyToOne(() => Column)
    public column: Column;

    @OrmColumn()
    public value: string;
}
