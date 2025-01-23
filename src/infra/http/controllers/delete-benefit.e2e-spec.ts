import { INestApplication } from '@nestjs/common'
import { EmployeeFactory } from 'test/factories/make-employee.factory'
import { RoleFactory } from 'test/factories/make-role.fatory'
import { Test } from '@nestjs/testing'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/databse.module'
import request from 'supertest'
import { JwtService } from '@nestjs/jwt'
import { BenefitFactory } from 'test/factories/make-benefit.factory'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Delete benefit (E2E)', () => {
  let app: INestApplication
  let employeeFactory: EmployeeFactory
  let roleFactory: RoleFactory
  let benefitFactory: BenefitFactory
  let jwt: JwtService
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [EmployeeFactory, RoleFactory, BenefitFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    employeeFactory = moduleRef.get(EmployeeFactory)
    roleFactory = moduleRef.get(RoleFactory)
    jwt = moduleRef.get(JwtService)
    benefitFactory = moduleRef.get(BenefitFactory)
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[DELETE] /benefits/delete/:id', async () => {
    const employee = await employeeFactory.makePrismaEmployee()

    const role = await roleFactory.makePrismaRole({
      employeeId: employee.id.toString(),
    })

    const accessToken = await jwt.signAsync({
      sub: employee.id.toString(),
    })

    const benefit = await benefitFactory.makePrismaBenefit({
      roleId: [role.id],
      name: 'vale refeicao',
      value: 580,
    })

    const benefitId = benefit.id.toString()

    const response = await request(app.getHttpServer())
      .delete(`/benefits/delete/${benefitId}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(200)

    const benefitOnDatabase = await prisma.benefit.findUnique({
      where: {
        id: benefitId,
      },
    })

    expect(benefitOnDatabase).toBeNull()
  })
})
