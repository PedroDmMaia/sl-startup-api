import { INestApplication } from '@nestjs/common'
import { EmployeeFactory } from 'test/factories/make-employee.factory'
import { RoleFactory } from 'test/factories/make-role.fatory'
import { Test } from '@nestjs/testing'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/databse.module'
import request from 'supertest'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Update employee (E2E)', () => {
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

  test('[PUt] /employee/:employeeId', async () => {
    const employee = await employeeFactory.makePrismaEmployee()

    const employee2 = await employeeFactory.makePrismaEmployee({
      cpf: '12345678901',
      rg: '123456789',
    })

    await roleFactory.makePrismaRole({
      employeeId: employee.id.toString(),
    })

    const accessToken = await jwt.signAsync({
      sub: employee.id.toString(),
    })

    const employeeId = employee2.id.toString()

    const response = await request(app.getHttpServer())
      .put(`/employee/${employeeId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'jhon doe',
        cpf: '123123123872',
        rg: '121231231',
        email: 'jhon@example.com',
        password: '123',
        phoneNumber: '123323232324',
        isActive: true,
      })

    console.log(employee.phoneNumber)

    expect(response.statusCode).toBe(204)

    const updatedEmployeeDetails = await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
    })

    expect(updatedEmployeeDetails?.name).toEqual('jhon doe')
  })
})
