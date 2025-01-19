import { Either, left, right } from '@/core/either'
import { Employee } from '../../enterprise/entities/employee'
import { EmployeeRepository } from '../repositories/employee.repository'
import { UserWithSameInformationError } from '@/core/errors/error/user-with-same-informations.error'
import { Injectable } from '@nestjs/common'
import { HashGenator } from '../cryptography/hash-gerator'

interface CreateEmployeeUseCaseResquest {
  name: string
  cpf: string
  rg: string
  email: string
  password: string
  phoneNumber: string
}

type CreateEmployeeUseCaseResponse = Either<
  UserWithSameInformationError,
  { employee: Employee }
>

@Injectable()
export class CreateEmployeeUseCase {
  constructor(
    private employeeRepository: EmployeeRepository,
    private hashGenator: HashGenator,
  ) {}

  async execute({
    name,
    cpf,
    rg,
    email,
    password,
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

    const hashedPassword = await this.hashGenator.hash(password)

    const employee = Employee.create({
      name,
      cpf,
      rg,
      email,
      password: hashedPassword,
      phoneNumber,
    })

    await this.employeeRepository.create(employee)

    return right({ employee })
  }
}
