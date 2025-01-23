import { INestApplication } from '@nestjs/common'
import { EmployeeFactory } from 'test/factories/make-employee.factory'
import { RoleFactory } from 'test/factories/make-role.fatory'
import { Test } from '@nestjs/testing'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/databse.module'
import request from 'supertest'
import { JwtService } from '@nestjs/jwt'

describe('Create role (E2E)', () => {
  let app: INestApplication
  let employeeFactory: EmployeeFactory
  let roleFactory: RoleFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [EmployeeFactory, RoleFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    employeeFactory = moduleRef.get(EmployeeFactory)
    roleFactory = moduleRef.get(RoleFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[POST] /roles/:employeeId', async () => {
    const employee = await employeeFactory.makePrismaEmployee()

    await roleFactory.makePrismaRole({
      employeeId: employee.id.toString(),
    })

    const accessToken = await jwt.signAsync({
      sub: employee.id.toString(),
    })

    const employee2 = await employeeFactory.makePrismaEmployee({
      cpf: '09090909809',
      rg: '122342342',
    })

    const employeeId = employee2.id.toString()

    const response = await request(app.getHttpServer())
      .post(`/roles/${employeeId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'trinee',
        pay: 1514,
        description: 'vaga de trainee',
        hourlyRate: 9,
        weeklyHours: 6,
        benefitsIds: [],
      })

    expect(response.statusCode).toBe(201)
  })
})
