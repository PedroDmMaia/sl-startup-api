import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { EmployeeRepository } from '../repositories/employee.repository'
import { Either, left, right } from '@/core/either'
import { Employee } from '../../enterprise/entities/employee'

interface UpdateEmployeeUseCaseResquest {
  employeeId: UniqueEntityid
  name: string
  cpf: string
  rg: string
  email: string
  phoneNumber: string
  isActive: boolean
}

type UpdateEmployeeUseCaseResponse = Either<null, { employee: Employee }>

export class UpdateEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async exeute({
    employeeId,
    name,
    cpf,
    rg,
    email,
    phoneNumber,
    isActive,
  }: UpdateEmployeeUseCaseResquest): Promise<UpdateEmployeeUseCaseResponse> {
    const employee = await this.employeeRepository.findById(
      employeeId.toString(),
    )

    if (!employee) {
      return left(null)
    }

    employee.name = name
    employee.cpf = cpf
    employee.rg = rg
    employee.email = email
    employee.phoneNumber = phoneNumber
    employee.isActive = isActive

    await this.employeeRepository.update(employee)

    return right({ employee })
  }
}
