import { Either, left, right } from '@/core/either'
import { UserRepository } from '../repositories/user.repository'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'

interface deleteUserUseCaseRequest {
  userId: UniqueEntityid
}

type deleteUserUseCaseResponse = Either<null, null>

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: deleteUserUseCaseRequest): Promise<deleteUserUseCaseResponse> {
    const user = await this.userRepository.findById(userId.toString())

    if (!user) return left(null)

    await this.userRepository.delete(userId.toString())

    return right(null)
  }
}
