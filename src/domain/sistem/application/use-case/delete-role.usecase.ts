import { Either, left, right } from '@/core/either'
import { RoleRepository } from '../repositories/role.repository'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'

interface deleteRoleUseCaseResquest {
  roleId: UniqueEntityid
}

type deleteRoleUseCaseResponse = Either<null, null>

export class DeleteRoleUseCase {
  constructor(private roleRepository: RoleRepository) {}

  async execute({
    roleId,
  }: deleteRoleUseCaseResquest): Promise<deleteRoleUseCaseResponse> {
    const role = await this.roleRepository.findById(roleId.toString())
    if (!role) {
      return left(null)
    }

    await this.roleRepository.delete(roleId.toString())

    return right(null)
  }
}
