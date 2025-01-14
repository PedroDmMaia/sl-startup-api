import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { RoleRepository } from '../repositories/role.repository'
import { Either, left, right } from '@/core/either'
import { Role } from '../../enterprise/entities/role'
import { EmployeeRepository } from '../repositories/employee.repository'

interface UpdateRoleUseCaseResquest {
  roleId: UniqueEntityid
  employeesIds?: UniqueEntityid[]
  name: string
  pay: number
  description: string
  hourlyRate: number
  weeklyHours: number
  benefitsIds?: UniqueEntityid[]
}

type UpdateRoleUseCaseResponse = Either<null, { role: Role }>

export class UpdateRoleUseCase {
  constructor(
    private roleRepository: RoleRepository,
    private employeeRepository: EmployeeRepository,
  ) {}

  async execute({
    roleId,
    employeesIds,
    name,
    pay,
    description,
    hourlyRate,
    weeklyHours,
    benefitsIds,
  }: UpdateRoleUseCaseResquest): Promise<UpdateRoleUseCaseResponse> {
    const validEmployees = employeesIds
      ? await Promise.all(
          employeesIds.map(async (item) => {
            const employee = await this.employeeRepository.findById(
              item.toString(),
            )
            return employee || null
          }),
        )
      : []

    const invalidEmployees = validEmployees.filter((item) => item === null)

    if (invalidEmployees.length > 0) {
      return left(null)
    }

    const role = await this.roleRepository.findById(roleId.toString())

    if (!role) return left(null)

    role.employeesIds = employeesIds ?? []
    role.name = name
    role.pay = pay
    role.description = description
    role.hourlyRate = hourlyRate
    role.weeklyHours = weeklyHours
    role.benefitsIds = benefitsIds ?? []

    await this.roleRepository.update(role)

    return right({ role })
  }
}
