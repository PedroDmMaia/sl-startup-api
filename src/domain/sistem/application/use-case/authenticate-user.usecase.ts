import { Either, left, right } from '@/core/either'
import { HashCompare } from '../cryptography/hash-compare'
import { Encrypter } from '../cryptography/encrypter'
import { WrongCreadentialsError } from './errors/wrong-credentials.error'
import { Injectable } from '@nestjs/common'
import { EmployeeRepository } from '../repositories/employee.repository'
import { RoleRepository } from '../repositories/role.repository'

interface AuthenticateEmployeeUseCaseRequest {
  email: string
  password: string
}

type AuthenticateEmployeeUseCaseResponse = Either<
  WrongCreadentialsError,
  { accessToken: string }
>
@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private employeeRepository: EmployeeRepository,
    private roleRepository: RoleRepository,
    private hashCompare: HashCompare,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateEmployeeUseCaseRequest): Promise<AuthenticateEmployeeUseCaseResponse> {
    const employee = await this.employeeRepository.findByEmail(email)

    if (!employee) {
      return left(new WrongCreadentialsError())
    }

    const isPasswordValid = await this.hashCompare.compare(
      password,
      employee.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCreadentialsError())
    }

    const employeeRole = await this.roleRepository.findByEmployeeId(
      employee.id.toString(),
    )

    if (!employeeRole) {
      return left(new WrongCreadentialsError())
    }

    if (employeeRole.name !== 'rh') {
      return left(new WrongCreadentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: employee.id.toString(),
    })

    return right({ accessToken })
  }
}
