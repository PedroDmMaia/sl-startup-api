import { Either, left, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { UserRepository } from '../repositories/user.repository'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { EmployeeRepository } from '../repositories/employee.repository'

interface createUserUseCaseRequest {
  employeeId: UniqueEntityid
  userName: string
  password: string
}

type CreateUserUseCaseResponse = Either<null, { user: User }>

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private employeeRepository: EmployeeRepository,
  ) {}

  async execute({
    employeeId,
    userName,
    password,
  }: createUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const employeeExistsOrIsRH = await this.employeeRepository.findById(
      employeeId.toString(),
    )

    if (!employeeExistsOrIsRH) {
      return left(null)
    }

    const user = User.create({
      employeeId,
      userName,
      password,
    })

    await this.userRepository.create(user)

    return right({ user })
  }
}
