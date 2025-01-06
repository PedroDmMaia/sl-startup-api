import { Either, right, left } from '@/core/either'
import { User } from '../../enterprise/entities/user'
import { UserRepository } from '../repositories/user.repository'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'

interface updateUserUseCaseRequest {
  employeeId: UniqueEntityid
  userName: string
  password: string
  isActive: boolean
}

type updateUserUseCaseResponse = Either<null, { user: User }>

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    employeeId,
    userName,
    password,
    isActive,
  }: updateUserUseCaseRequest): Promise<updateUserUseCaseResponse> {
    const user = await this.userRepository.findByEmployeeId(
      employeeId.toString(),
    )

    if (!user) {
      return left(null)
    }

    user.userName = userName
    user.password = password.length > 3 ? password : user.password
    user.isActive = isActive

    await this.userRepository.update(user)

    return right({ user })
  }
}
