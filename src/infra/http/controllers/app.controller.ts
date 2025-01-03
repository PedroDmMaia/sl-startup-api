import { Controller } from '@nestjs/common'
import { AppService } from '@/infra/app.service'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    private prismaService: PrismaService,
  ) {}
}
