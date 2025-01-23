import { INestApplication } from '@nestjs/common'
import { EmployeeFactory } from 'test/factories/make-employee.factory'
import { RoleFactory } from 'test/factories/make-role.fatory'
import { Test } from '@nestjs/testing'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/databse.module'
import request from 'supertest'
import { JwtService } from '@nestjs/jwt'
import { BenefitFactory } from 'test/factories/make-benefit.factory'

describe('Fetch benefits (E2E)', () => {
  let app: INestApplication
  let employeeFactory: EmployeeFactory
  let roleFactory: RoleFactory
  let benefitFactory: BenefitFactory
  let jwt: JwtService

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

    await app.init()
  })

  test('[GET] /benefit/list', async () => {
    const employee = await employeeFactory.makePrismaEmployee()

    const role = await roleFactory.makePrismaRole({
      employeeId: employee.id.toString(),
    })

    const accessToken = await jwt.signAsync({
      sub: employee.id.toString(),
    })

    await Promise.all([
      benefitFactory.makePrismaBenefit({
        roleId: [role.id],
        name: 'vale transporte',
        value: 280,
      }),

      benefitFactory.makePrismaBenefit({
        roleId: [role.id],
        name: 'vale refeicao',
        value: 500,
      }),
    ])

    const response = await request(app.getHttpServer())
      .get(`/benefit/list?page=1`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      benefits: expect.arrayContaining([
        expect.objectContaining({ name: 'vale transporte' }),
        expect.objectContaining({ name: 'vale refeicao' }),
      ]),
    })
  })
})
