import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { Employee } from '@/domain/sistem/enterprise/entities/Employee'
import { Prisma, Employee as PrismaEmployee } from '@prisma/client'

export abstract class PrismaEmployeeMapper {
  static toDomain(raw: PrismaEmployee): Employee {
    return Employee.create(
      {
        name: raw.name,
        cpf: raw.cpf,
        rg: raw.rg,
        email: raw.email,
        password: raw.password,
        phoneNumber: raw.phoneNumber,
      },
      new UniqueEntityid(raw.id),
    )
  }

  static toPrisma(employee: Employee): Prisma.EmployeeUncheckedCreateInput {
    return {
      id: employee.id.toString(),
      name: employee.name,
      cpf: employee.cpf,
      rg: employee.rg,
      email: employee.email,
      password: employee.password,
      phoneNumber: employee.phoneNumber,
    }
  }
}
