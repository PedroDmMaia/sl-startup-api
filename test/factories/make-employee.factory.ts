import { UniqueEntityid } from 'core/entities/unique-entity-id'
import {
  Employee,
  employeeProps,
} from 'domain/sistem/enterprise/entities/employee'
import { PrismaEmployeeMapper } from 'infra/database/mappers/prisma-employee.mapper'
import { PrismaService } from 'infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

export function MakeEmployee(
  overrride: Partial<employeeProps> = {},
  id?: UniqueEntityid,
) {
  const employee = Employee.create(
    {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      cpf: '1231231231231',
      rg: '1231231231',
      phoneNumber: faker.phone.imei(),
      ...overrride,
    },
    id,
  )

  return employee
}

@Injectable()
export class EmployeeFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaEmployee(
    data: Partial<employeeProps> = {},
  ): Promise<Employee> {
    const employee = MakeEmployee(data)

    await this.prisma.employee.create({
      data: PrismaEmployeeMapper.toPrisma(employee),
    })

    return employee
  }
}
