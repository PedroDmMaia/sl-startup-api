import { Either, left, right } from '@/core/either'
import { Employee } from '../../enterprise/entities/employee'
import { EmployeeRepository } from '../repositories/employee.repository'
import { UserWithSameInformationError } from '@/core/errors/error/user-with-same-informations.error'

interface CreateEmployeeUseCaseResquest {
  name: string
  cpf: string
  rg: string
  email: string
  phoneNumber: string
}

type CreateEmployeeUseCaseResponse = Either<
  UserWithSameInformationError,
  { employee: Employee }
>

export class CreateEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}
  async exeute({
    name,
    cpf,
    rg,
    email,
    phoneNumber,
  }: CreateEmployeeUseCaseResquest): Promise<CreateEmployeeUseCaseResponse> {
    const employeeWithSameCpf = await this.employeeRepository.findByCpf(cpf)
    if (employeeWithSameCpf) {
      return left(new UserWithSameInformationError())
    }

    const employeeWithSameRg = await this.employeeRepository.findByRg(rg)
    if (employeeWithSameRg) {
      return left(new UserWithSameInformationError())
    }

    const employeeWithSameEmail =
      await this.employeeRepository.findByEmail(email)
    if (employeeWithSameEmail) {
      return left(new UserWithSameInformationError())
    }

    const employee = Employee.create({
      name,
      cpf,
      rg,
      email,
      phoneNumber,
    })

    await this.employeeRepository.create(employee)

    return right({ employee })
  }
}
