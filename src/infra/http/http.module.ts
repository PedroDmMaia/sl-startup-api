import { Module } from '@nestjs/common'
import { AppController } from './controllers/app.controller'
import { AppService } from '../app.service'
import { DatabaseModule } from '../database/databse.module'

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class HttpModule {}
