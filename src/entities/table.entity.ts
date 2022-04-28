import { Column as OrmColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Column } from "./column.entity";
import { Row } from "./row.entity";
import { WorkSpace } from "./workspace.entity";

@Entity()
export class Table {
    @PrimaryGeneratedColumn()
    public id: string;

    @ManyToOne(() => WorkSpace, workSpace => workSpace.tables)
    public workSpace: WorkSpace;

    @OneToMany(() => Row, row => row.table)
    public rows: Row[];

    @OneToMany(() => Column, column => column.table)
    public columns: Column[];

    @OrmColumn()
    public name: string;
}
