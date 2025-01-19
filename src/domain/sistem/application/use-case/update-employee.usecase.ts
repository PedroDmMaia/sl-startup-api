import { EmployeeRepository } from '../repositories/employee.repository'
import { Either, left, right } from '@/core/either'
import { Employee } from '../../enterprise/entities/employee'
import { Injectable } from '@nestjs/common'
import { UserWithSameInformationError } from '@/core/errors/error/user-with-same-informations.error'
import { HashGenator } from '../cryptography/hash-gerator'
import { EmployeeNotFoundError } from './errors/employee-not-found.errror'

interface UpdateEmployeeUseCaseRequest {
  employeeId: string
  name: string
  cpf: string
  rg: string
  email: string
  password: string
  phoneNumber: string
  isActive: boolean
}

type UpdateEmployeeUseCaseResponse = Either<
  UserWithSameInformationError | EmployeeNotFoundError | Error, // Adicionando uma nova verificação de erro
  { employee: Employee }
>

@Injectable()
export class UpdateEmployeeUseCase {
  constructor(
    private employeeRepository: EmployeeRepository,
    private hashGenator: HashGenator,
  ) {}

  async execute({
    employeeId,
    name,
    cpf,
    rg,
    email,
    password,
    phoneNumber,
    isActive,
  }: UpdateEmployeeUseCaseRequest): Promise<UpdateEmployeeUseCaseResponse> {
    const employee = await this.employeeRepository.findById(employeeId)

    if (!employee) {
      return left(new EmployeeNotFoundError())
    }

    const employeeWithSameCpf = await this.employeeRepository.findByCpf(cpf)
    if (
      employeeWithSameCpf &&
      employeeWithSameCpf.id.toString() !== employeeId
    ) {
      return left(new UserWithSameInformationError())
    }

    const employeeWithSameRg = await this.employeeRepository.findByRg(rg)
    if (employeeWithSameRg && employeeWithSameRg.id.toString() !== employeeId) {
      return left(new UserWithSameInformationError())
    }

    const employeeWithSameEmail =
      await this.employeeRepository.findByEmail(email)
    if (
      employeeWithSameEmail &&
      employeeWithSameEmail.id.toString() !== employeeId
    ) {
      return left(new UserWithSameInformationError())
    }

    const hashedPassword = await this.hashGenator.hash(password)

    employee.name = name
    employee.cpf = cpf
    employee.rg = rg
    employee.email = email
    employee.password = hashedPassword
    employee.phoneNumber = phoneNumber
    employee.isActive = isActive

    await this.employeeRepository.update(employee)

    return right({ employee })
  }
}
