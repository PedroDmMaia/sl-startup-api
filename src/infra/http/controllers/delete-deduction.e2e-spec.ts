import { INestApplication } from '@nestjs/common'
import { EmployeeFactory } from 'test/factories/make-employee.factory'
import { RoleFactory } from 'test/factories/make-role.fatory'
import { Test } from '@nestjs/testing'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/databse.module'
import request from 'supertest'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { DeductionFactory } from 'test/factories/make-deductions.factory'

describe('Delete deduction (E2E)', () => {
  let app: INestApplication
  let employeeFactory: EmployeeFactory
  let roleFactory: RoleFactory
  let deductionFactory: DeductionFactory
  let jwt: JwtService
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [EmployeeFactory, RoleFactory, DeductionFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    employeeFactory = moduleRef.get(EmployeeFactory)
    roleFactory = moduleRef.get(RoleFactory)
    jwt = moduleRef.get(JwtService)
    deductionFactory = moduleRef.get(DeductionFactory)
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[DELETE] /deduction/delete/:deductionId', async () => {
    const employee = await employeeFactory.makePrismaEmployee()

    await roleFactory.makePrismaRole({
      employeeId: employee.id.toString(),
    })

    const accessToken = await jwt.signAsync({
      sub: employee.id.toString(),
    })

    const deduction = await deductionFactory.makePrismaDeduction({
      employeeId: employee.id,
    })

    const deductionId = deduction.id.toString()

    const response = await request(app.getHttpServer())
      .delete(`/deduction/delete/${deductionId}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(200)

    const deductionOnDatabase = await prisma.deduction.findUnique({
      where: {
        id: deductionId,
      },
    })

    expect(deductionOnDatabase).toBeNull()
  })
})
