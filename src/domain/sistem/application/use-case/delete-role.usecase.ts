import { Either, left, right } from '@/core/either'
import { RoleRepository } from '../repositories/role.repository'
import { Injectable } from '@nestjs/common'

interface deleteRoleUseCaseResquest {
  roleId: string
}

type deleteRoleUseCaseResponse = Either<null, null>

@Injectable()
export class DeleteRoleUseCase {
  constructor(private roleRepository: RoleRepository) {}

  async execute({
    roleId,
  }: deleteRoleUseCaseResquest): Promise<deleteRoleUseCaseResponse> {
    const role = await this.roleRepository.findById(roleId)

    if (!role) {
      return left(null)
    }

    await this.roleRepository.delete(roleId.toString())

    return right(null)
  }
}
