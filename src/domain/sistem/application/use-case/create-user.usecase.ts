import { Either, left, right } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { UserRepository } from '../repositories/user.repository'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { EmployeeRepository } from '../repositories/employee.repository'
import { HashGenator } from '../cryptography/hash-gerator'

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
    private hashGerator: HashGenator,
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

    const passwordHashed = await this.hashGerator.hash(password)

    const userNameFormat = userName.trim().toLowerCase()

    const user = User.create({
      employeeId,
      userName: userNameFormat,
      password: passwordHashed,
    })

    await this.userRepository.create(user)

    return right({ user })
  }
}
