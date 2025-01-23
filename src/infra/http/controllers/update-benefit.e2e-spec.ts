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

describe('Update benefit (E2E)', () => {
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
    benefitFactory = moduleRef.get(BenefitFactory)
    jwt = moduleRef.get(JwtService)
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[PUt] /benefit/:benefitId', async () => {
    const employee = await employeeFactory.makePrismaEmployee()

    const role = await roleFactory.makePrismaRole({
      employeeId: employee.id.toString(),
    })

    const accessToken = await jwt.signAsync({
      sub: employee.id.toString(),
    })

    const benefit = await benefitFactory.makePrismaBenefit({
      roleId: [role.id],
      name: 'vale alimentacao',
      value: 500,
    })

    const benefitId = benefit.id.toString()

    const response = await request(app.getHttpServer())
      .put(`/benefit/${benefitId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: benefit.name,
        value: 520,
      })

    expect(response.statusCode).toBe(204)

    const updatedBenefitDetails = await prisma.benefit.findUnique({
      where: {
        id: benefitId,
      },
    })

    expect(updatedBenefitDetails?.value).toEqual(520)
  })
})
