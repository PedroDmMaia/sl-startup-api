import { Controller } from '@nestjs/common'
import { AppService } from 'src/infra/app.service'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    private prismaService: PrismaService,
  ) {}
}
