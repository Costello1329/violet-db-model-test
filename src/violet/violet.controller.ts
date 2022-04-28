import { Body, Controller, Get, Put } from '@nestjs/common';
import { VioletService } from './violet.service';


@Controller()
export class VioletController {
  public constructor (private readonly violetService: VioletService) {}

  @Get('filter')
  public async filter (): Promise<void> {
    // return this.violetService.getRandomTable().then(table => `id: ${table.id} name: ${table.name}`);
  }

  @Put('fill')
  public async fillDatabaseWithData (
    @Body('workSpacesCountMin') workSpacesCountMin: number,
    @Body('workSpacesCountMax') workSpacesCountMax: number,
    @Body('tablesCountMin') tablesCountMin: number,
    @Body('tablesCountMin') tablesCountMax: number,
    @Body('columnsCountMin') columnsCountMin: number,
    @Body('columnsCountMax') columnsCountMax: number,
    @Body('rowsCountMin') rowsCountMin: number,
    @Body('rowsCountMax') rowsCountMax: number
  ): Promise<string> {
    return this.violetService.clearDataBase()
      .then(() => this.violetService.addColumnTypes())
      .then(() => this.violetService.genTestData(
        [workSpacesCountMin, workSpacesCountMax],
        [tablesCountMin, tablesCountMax],
        [columnsCountMin, columnsCountMax],
        [rowsCountMin, rowsCountMax]
      )).then(() => "finished");
  }
}
