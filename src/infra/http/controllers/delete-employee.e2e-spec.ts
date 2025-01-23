import { INestApplication } from '@nestjs/common'
import { EmployeeFactory } from 'test/factories/make-employee.factory'
import { RoleFactory } from 'test/factories/make-role.fatory'
import { Test } from '@nestjs/testing'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/databse.module'
import request from 'supertest'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Delete employee (E2E)', () => {
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

  test('[DELETE] /account/delete/:employeeId', async () => {
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
      .delete(`/account/delete/${employeeId}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(200)

    const employeeOnDatabase = await prisma.deduction.findUnique({
      where: {
        id: employeeId,
      },
    })

    expect(employeeOnDatabase).toBeNull()
  })
})
