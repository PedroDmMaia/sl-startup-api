import { INestApplication } from '@nestjs/common'
import { EmployeeFactory } from 'test/factories/make-employee.factory'
import { RoleFactory } from 'test/factories/make-role.fatory'
import { Test } from '@nestjs/testing'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/databse.module'
import request from 'supertest'
import { JwtService } from '@nestjs/jwt'
import { BankFactory } from 'test/factories/make-bank.factory'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Update bank details (E2E)', () => {
  let app: INestApplication
  let employeeFactory: EmployeeFactory
  let roleFactory: RoleFactory
  let bankFactory: BankFactory
  let jwt: JwtService
  let prisma: PrismaService

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
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[PUT] /bank/:employeeId', async () => {
    const employee = await employeeFactory.makePrismaEmployee()

    await roleFactory.makePrismaRole({
      employeeId: employee.id.toString(),
    })

    const accessToken = await jwt.signAsync({
      sub: employee.id.toString(),
    })

    const bank = await bankFactory.makePrismaBank({
      employeeId: employee.id,
      bankName: 'anyBank',
    })

    const employeeId = employee.id.toString()

    const response = await request(app.getHttpServer())
      .put(`/bank/${employeeId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        bankName: 'bankAny',
        accountNumber: bank.accountNumber,
        agencyNumber: bank.agencyNumber,
      })

    expect(response.statusCode).toBe(204)

    const updatedBankDetails = await prisma.bank.findUnique({
      where: {
        employeeId,
      },
    })

    expect(updatedBankDetails?.bankName).toEqual('bankAny')
  })
})
