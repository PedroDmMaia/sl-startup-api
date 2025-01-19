import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import {
  Employee,
  employeeProps,
} from '@/domain/sistem/enterprise/entities/employee'
import { faker } from '@faker-js/faker'

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
