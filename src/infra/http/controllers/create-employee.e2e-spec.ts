import { INestApplication } from '@nestjs/common'
import { EmployeeFactory } from 'test/factories/make-employee.factory'
import { RoleFactory } from 'test/factories/make-role.fatory'
import { Test } from '@nestjs/testing'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/databse.module'
import request from 'supertest'

describe('Create employee (E2E)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [EmployeeFactory, RoleFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })

  test('[POST] /accounts/create', async () => {
    const response = await request(app.getHttpServer())
      .post(`/accounts/create`)
      .send({
        name: 'pedro',
        cpf: '899889009889',
        rg: '121231231',
        email: 'pedro@example.com',
        password: '123',
        phoneNumber: '123123123123',
      })

    expect(response.statusCode).toBe(201)
  })
})
