import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { VioletModule } from '../violet/violet.module';
import config from '../ormconfig';
import { VioletHttpModule } from 'src/violet/violet-http.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), VioletModule, VioletHttpModule],
})
export class AppModule {
  public constructor (private connection: Connection) {}
}
