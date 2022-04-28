import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnType } from '../entities/columntype.entity';
import { Column } from '../entities/column.entity';
import { Field } from '../entities/field.entity';
import { Row } from '../entities/row.entity';
import { Table } from '../entities/table.entity';
import { WorkSpace } from '../entities/workspace.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkSpace]),
    TypeOrmModule.forFeature([Table]),
    TypeOrmModule.forFeature([Row]),
    TypeOrmModule.forFeature([Column]),
    TypeOrmModule.forFeature([Field]),
    TypeOrmModule.forFeature([ColumnType])
  ],
  exports: [TypeOrmModule]
})
export class VioletModule {}
