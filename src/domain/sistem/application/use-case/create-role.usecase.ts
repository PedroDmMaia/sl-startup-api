import { Either, left, right } from '@/core/either'
import { Role } from '../../enterprise/entities/role'
import { RoleRepository } from '../repositories/role.repository'
import { EmployeeRepository } from '../repositories/employee.repository'
import { Injectable } from '@nestjs/common'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'

interface CreateRoleUseCaseRequest {
  employeeId: string
  name: string
  pay: number
  description: string
  hourlyRate: number
  weeklyHours: number
  benefitsIds?: string[]
}

type createRoleUseCaseResponse = Either<null, { role: Role }>

@Injectable()
export class CreateRoleUseCase {
  constructor(
    private roleRespository: RoleRepository,
    private employeeRepository: EmployeeRepository,
  ) {}

  async execute({
    employeeId,
    name,
    pay,
    description,
    hourlyRate,
    weeklyHours,
    benefitsIds,
  }: CreateRoleUseCaseRequest): Promise<createRoleUseCaseResponse> {
    const validEmployee = await this.employeeRepository.findById(employeeId)

    const employeeHaveRole =
      await this.roleRespository.findByEmployeeId(employeeId)

    if (employeeHaveRole) return left(null)

    if (!validEmployee) return left(null)

    const roleName = name.toLowerCase()

    const benefitsIdsToUniqueEntityId = benefitsIds?.map(
      (item) => new UniqueEntityid(item),
    )

    const role = Role.create({
      employeeId,
      name: roleName,
      pay,
      description,
      hourlyRate,
      weeklyHours,
      benefitsIds: benefitsIdsToUniqueEntityId,
    })

    await this.roleRespository.create(role)

    return right({ role })
  }
}
