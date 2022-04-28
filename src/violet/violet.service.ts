import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkSpace } from '../entities/workspace.entity';
import { Table } from '../entities/table.entity';
import { Row } from '../entities/row.entity';
import { Column } from '../entities/column.entity';
import { Field } from '../entities/field.entity';
import { ColumnType } from '../entities/columntype.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { words } from './words';

@Injectable()
export class VioletService {
  public constructor (
    @InjectRepository(WorkSpace) private workSpaceRepository: Repository<WorkSpace>,
    @InjectRepository(Table) private tableRepository: Repository<Table>,
    @InjectRepository(Row) private rowRepository: Repository<Row>,
    @InjectRepository(Column) private columnRepository: Repository<Column>,
    @InjectRepository(ColumnType) private columnTypeRepository: Repository<ColumnType>,
    @InjectRepository(Field) private fieldRepository: Repository<Field>
  ) {}

  private readonly randomNumber =
    (min: number, max: number): number =>
      Math.floor(Math.random() * (max - min)) + min;

  private readonly entityName = () => uuid().split('-')[0];
  
  public randomWord () {
    return words[Math.trunc(Math.random() * 1000)];
  }
  
  private randomSentence (wordsCount: number) {
    const sentence: string[] = [];
    for (let i = 0; i < wordsCount; i ++)
      sentence.push(this.randomWord());
    return sentence.join(" ");
  }

  private generateValue (columnType: ColumnType): string {
    if (columnType.name === "string")
      return this.randomSentence(this.randomNumber(7, 13));
    else if (columnType.name === "number")
      return Math.trunc(Math.random() * 2000 - 1000).toString();
    else
      return "";
  }

  private async createAndFillWorkSpace (
    tablesCount: [number, number],
    rowsCount: [number, number],
    columnsCount: [number, number]
  ): Promise<void> {
    const wsName = this.entityName();
    const workSpace: WorkSpace = await this.workSpaceRepository.save(this.workSpaceRepository.create({
      name: `WorkSpace #${wsName}`
    }));

    const tablesCountValue: number = this.randomNumber(... tablesCount);
    
    for (let i = 0; i < tablesCountValue; i ++) {
      const tName = this.entityName();
      const table: Table = await this.tableRepository.save(this.tableRepository.create({
        workSpace,
        name: `Table #${tName} in WorkSpace #${wsName}`,
      }));

      const columnTypes: ColumnType[] = await this.columnTypeRepository.find();

      const rowsCountValue: number = this.randomNumber(... rowsCount);
      const rows: Row[] = [];

      for (let rowIdx = 0; rowIdx < rowsCountValue; rowIdx ++)
        rows.push(this.rowRepository.create({
          table,
          idx: rowIdx
        }));

      await this.rowRepository.save(rows);

      const columnsCountValue: number = this.randomNumber(... columnsCount);
      const columns: Column[] = [];

      for (let columnIdx = 0; columnIdx < columnsCountValue; columnIdx ++)
        columns.push(this.columnRepository.create({
          table,
          idx: columnIdx,
          name: `Column #${this.entityName()} in Table #${tName}`,
          columnType: columnTypes[this.randomNumber(0, columnTypes.length)]
        }));

      await this.columnRepository.save(columns);

      const fields: Field[] = [];

      for (let rowIdx = 0; rowIdx < rowsCountValue; rowIdx ++)
        for (let columnIdx = 0; columnIdx < columnsCountValue; columnIdx ++)
          fields.push(this.fieldRepository.create({
            table,
            row: rows[rowIdx],
            column: columns[columnIdx],
            value: this.generateValue(columns[columnIdx].columnType)
          }));

      await this.fieldRepository.save(fields);
    }
  }

  public async clearDataBase (): Promise<void> {
    await Promise.all([
      this.workSpaceRepository.clear(),
      this.tableRepository.clear(),
      this.rowRepository.clear(),
      this.columnRepository.clear(),
      this.columnTypeRepository.clear(),
      this.fieldRepository.clear()
    ])
  }

  public addColumnTypes (): Promise<ColumnType[]> {
    return this.columnTypeRepository.save([
      this.columnTypeRepository.create({ name: "string" }),
      this.columnTypeRepository.create({ name: "number" })
    ]);
  }

  public async genTestData (
    workSpaceCount: [number, number],
    tablesCount: [number, number],
    rowsCount: [number, number],
    columnsCount: [number, number]
  ): Promise<void> {
    await Promise.all(
      [... Array(this.randomNumber(... workSpaceCount)).keys()]
        .map(_ => this.createAndFillWorkSpace(tablesCount, rowsCount, columnsCount))
    );
  }
}
