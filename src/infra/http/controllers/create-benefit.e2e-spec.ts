import { INestApplication } from '@nestjs/common'
import { EmployeeFactory } from 'test/factories/make-employee.factory'
import { RoleFactory } from 'test/factories/make-role.fatory'
import { Test } from '@nestjs/testing'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/databse.module'
import request from 'supertest'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Create benefit (E2E)', () => {
  let app: INestApplication
  let employeeFactory: EmployeeFactory
  let roleFactory: RoleFactory
  let jwt: JwtService
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [EmployeeFactory, RoleFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    employeeFactory = moduleRef.get(EmployeeFactory)
    roleFactory = moduleRef.get(RoleFactory)
    jwt = moduleRef.get(JwtService)
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /benefit/:employeeId', async () => {
    const employee = await employeeFactory.makePrismaEmployee()

    const employee2 = await employeeFactory.makePrismaEmployee({
      cpf: '09090909809',
      rg: '122342342',
    })

    const role = await roleFactory.makePrismaRole({
      employeeId: employee.id.toString(),
    })

    const role2 = await roleFactory.makePrismaRole({
      employeeId: employee2.id.toString(),
      name: 'trainee',
    })

    const accessToken = await jwt.signAsync({
      sub: employee.id.toString(),
    })

    const response = await request(app.getHttpServer())
      .post(`/benefit/${role.id.toString()},${role2.id.toString()}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'vale transporte',
        value: 280,
        conditions: 'usar transporte publico',
      })

    console.log(role)

    expect(response.statusCode).toBe(201)
  })
})
