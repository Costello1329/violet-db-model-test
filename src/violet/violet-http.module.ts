import { Module } from '@nestjs/common';
import { VioletModule } from './violet.module';
import { VioletService } from './violet.service';
import { VioletController } from './violet.controller';

@Module({
  imports: [VioletModule],
  providers: [VioletService],
  controllers: [VioletController]
})
export class VioletHttpModule {}
