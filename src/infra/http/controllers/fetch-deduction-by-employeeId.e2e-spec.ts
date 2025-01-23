import { INestApplication } from '@nestjs/common'
import { EmployeeFactory } from 'test/factories/make-employee.factory'
import { RoleFactory } from 'test/factories/make-role.fatory'
import { Test } from '@nestjs/testing'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/databse.module'
import request from 'supertest'
import { JwtService } from '@nestjs/jwt'
import { DeductionFactory } from 'test/factories/make-deductions.factory'

describe('Fetch benefits (E2E)', () => {
  let app: INestApplication
  let employeeFactory: EmployeeFactory
  let roleFactory: RoleFactory
  let deductionFactory: DeductionFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [EmployeeFactory, RoleFactory, DeductionFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    employeeFactory = moduleRef.get(EmployeeFactory)
    roleFactory = moduleRef.get(RoleFactory)
    deductionFactory = moduleRef.get(DeductionFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /employee/:employeeId/deduction', async () => {
    const employee = await employeeFactory.makePrismaEmployee()

    await roleFactory.makePrismaRole({
      employeeId: employee.id.toString(),
    })

    const accessToken = await jwt.signAsync({
      sub: employee.id.toString(),
    })

    await Promise.all([
      deductionFactory.makePrismaDeduction({
        employeeId: employee.id,
        reason: 'atraso',
        amount: 60,
        description: 'chegou atrasado',
      }),

      deductionFactory.makePrismaDeduction({
        employeeId: employee.id,
        reason: 'falta',
        amount: 150,
        description: 'faltou um dia',
      }),
    ])

    const employeeId = employee.id.toString()

    const response = await request(app.getHttpServer())
      .get(`/employee/${employeeId}/deduction?page=1`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      deductions: expect.arrayContaining([
        expect.objectContaining({ description: 'chegou atrasado' }),
        expect.objectContaining({ description: 'faltou um dia' }),
      ]),
    })
  })
})
