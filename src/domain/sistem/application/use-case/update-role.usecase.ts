import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { RoleRepository } from '../repositories/role.repository'
import { Either, left, right } from '@/core/either'
import { Role } from '../../enterprise/entities/role'
import { EmployeeRepository } from '../repositories/employee.repository'
import { Injectable } from '@nestjs/common'

interface UpdateRoleUseCaseResquest {
  roleId: string
  employeeId: string
  name: string
  pay: number
  description: string
  hourlyRate: number
  weeklyHours: number
  benefitsIds?: string[]
}

type UpdateRoleUseCaseResponse = Either<null, { role: Role }>

@Injectable()
export class UpdateRoleUseCase {
  constructor(
    private roleRepository: RoleRepository,
    private employeeRepository: EmployeeRepository,
  ) {}

  async execute({
    roleId,
    employeeId,
    name,
    pay,
    description,
    hourlyRate,
    weeklyHours,
    benefitsIds,
  }: UpdateRoleUseCaseResquest): Promise<UpdateRoleUseCaseResponse> {
    const validEmployee = await this.employeeRepository.findById(employeeId)

    if (!validEmployee) return left(null)

    const role = await this.roleRepository.findById(roleId.toString())

    if (!role) return left(null)

    role.employeeId = employeeId
    role.name = name
    role.pay = pay
    role.description = description
    role.hourlyRate = hourlyRate
    role.weeklyHours = weeklyHours
    role.benefitsIds =
      benefitsIds?.map((item) => new UniqueEntityid(item)) ?? []

    await this.roleRepository.update(role)

    return right({ role })
  }
}
