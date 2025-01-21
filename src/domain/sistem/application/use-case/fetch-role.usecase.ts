import { Either, right } from '@/core/either'
import { RoleRepository } from '../repositories/role.repository'
import { Role } from '../../enterprise/entities/role'
import { Injectable } from '@nestjs/common'

interface FetchRoleUseCaseResquest {
  page: number
  name?: string
}

type FetchRoleUseCaseResponse = Either<null, { role: Role[] }>

@Injectable()
export class FetchRoleUseCase {
  constructor(private roleRepository: RoleRepository) {}

  async execute({
    page,
    name,
  }: FetchRoleUseCaseResquest): Promise<FetchRoleUseCaseResponse> {
    const role = await this.roleRepository.SearchByName({ page }, name)

    return right({ role })
  }
}
