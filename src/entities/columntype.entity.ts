import { Column as OrmColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Column } from "./column.entity";

@Entity()
export class ColumnType {
    @PrimaryGeneratedColumn()
    public id: string;

    @OneToMany(() => Column, column => column.columnType)
    public columns: Column[];

    @OrmColumn()
    public name: string;
}
