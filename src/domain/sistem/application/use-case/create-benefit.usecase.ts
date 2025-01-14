import { Either, right, left } from '@/core/either'
import { Benefit } from '../../enterprise/entities/benefit'
import { BenefitRepository } from '../repositories/benefit.repository'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { RoleRepository } from '../repositories/role.repository'
import { InvalidRolesError } from '@/core/errors/error/invalid-role.error'

interface createBenefitUseCaseRequest {
  roleId: UniqueEntityid[]
  name: string
  value: number
  description?: string
  conditions?: string[]
}

type createBenefitUseCaseResponse = Either<
  InvalidRolesError,
  { benefit: Benefit }
>

export class CreateBenefitUseCase {
  constructor(
    private benefitRepository: BenefitRepository,
    private roleRepository: RoleRepository,
  ) {}

  async execute({
    roleId,
    name,
    value,
    description,
    conditions,
  }: createBenefitUseCaseRequest): Promise<createBenefitUseCaseResponse> {
    // in which functions the benefit will be attributed
    const roles = await Promise.all(
      roleId.map(async (id) => {
        const role = await this.roleRepository.findById(id.toString())
        return role || null
      }),
    )

    const invalidRoles = roles.filter((role) => role === null)

    if (invalidRoles.length > 0) {
      return left(new InvalidRolesError())
    }

    const benefit = Benefit.create({
      roleId,
      name,
      value,
      description,
      conditions,
    })

    await this.benefitRepository.create(benefit)

    return right({ benefit })
  }
}
