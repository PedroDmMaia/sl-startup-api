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
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [EmployeeFactory, RoleFactory, BenefitFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    employeeFactory = moduleRef.get(EmployeeFactory)
    roleFactory = moduleRef.get(RoleFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /benefit/list', async () => {
    const employee = await employeeFactory.makePrismaEmployee()

    await roleFactory.makePrismaRole({
      employeeId: employee.id.toString(),
    })

    const accessToken = await jwt.signAsync({
      sub: employee.id.toString(),
    })

    await Promise.all([
      employeeFactory.makePrismaEmployee({
        cpf: '12311212312',
        rg: '121231231',
      }),

      employeeFactory.makePrismaEmployee({
        cpf: '12311212311',
        rg: '121231230',
      }),
    ])

    const response = await request(app.getHttpServer())
      .get(`/employee/list?page=1`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      employees: expect.arrayContaining([
        expect.objectContaining({ cpf: '12311212312' }),
        expect.objectContaining({ cpf: '12311212311' }),
      ]),
    })
  })
})
