import { INestApplication } from '@nestjs/common'
import { EmployeeFactory } from 'test/factories/make-employee.factory'
import { RoleFactory } from 'test/factories/make-role.fatory'
import { Test } from '@nestjs/testing'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/databse.module'
import request from 'supertest'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Update role (E2E)', () => {
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

  test('[PUt] /role/:roleId', async () => {
    const employee = await employeeFactory.makePrismaEmployee()

    const role = await roleFactory.makePrismaRole({
      employeeId: employee.id.toString(),
    })

    const accessToken = await jwt.signAsync({
      sub: employee.id.toString(),
    })

    const roleId = role.id.toString()
    const employeeId = employee.id.toString()

    const response = await request(app.getHttpServer())
      .put(`/role/${roleId}/${employeeId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: role.name,
        pay: 3000,
        description: role.description,
        hourlyRate: role.hourlyRate,
        weeklyHours: role.weeklyHours,
        benefitsIds: role.benefitsIds,
      })

    console.log(response)

    expect(response.statusCode).toBe(204)

    const updatedRoletDetails = await prisma.role.findUnique({
      where: {
        id: roleId,
      },
    })

    expect(updatedRoletDetails?.pay).toEqual(3000)
  })
})
