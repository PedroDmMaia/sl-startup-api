import { Module } from '@nestjs/common'
import { AppController } from './controllers/app.controller'
import { DatabaseModule } from '../database/databse.module'

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [],
})
export class HttpModule {}
