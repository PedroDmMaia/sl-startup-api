import { INestApplication } from '@nestjs/common'
import { EmployeeFactory } from 'test/factories/make-employee.factory'
import { RoleFactory } from 'test/factories/make-role.fatory'
import { Test } from '@nestjs/testing'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/databse.module'
import request from 'supertest'
import { JwtService } from '@nestjs/jwt'
import { BankFactory } from 'test/factories/make-bank.factory'

describe('Fetch bank details (E2E)', () => {
  let app: INestApplication
  let employeeFactory: EmployeeFactory
  let roleFactory: RoleFactory
  let bankFactory: BankFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [EmployeeFactory, RoleFactory, BankFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    employeeFactory = moduleRef.get(EmployeeFactory)
    roleFactory = moduleRef.get(RoleFactory)
    bankFactory = moduleRef.get(BankFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /bank/list/:employeeId', async () => {
    const employee = await employeeFactory.makePrismaEmployee()

    await roleFactory.makePrismaRole({
      employeeId: employee.id.toString(),
    })

    const accessToken = await jwt.signAsync({
      sub: employee.id.toString(),
    })

    await bankFactory.makePrismaBank({
      employeeId: employee.id,
      bankName: 'anyBank',
    })

    const employeeId = employee.id.toString()

    const response = await request(app.getHttpServer())
      .get(`/bank/list/${employeeId}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({ employeeId, bankName: 'anyBank' }),
    )
  })
})
