import { Either, left, right } from '@/core/either'
import { Role } from '../../enterprise/entities/role'
import { RoleRepository } from '../repositories/role.repository'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { EmployeeRepository } from '../repositories/employee.repository'

interface CreateRoleUseCaseRequest {
  employeesIds?: UniqueEntityid[]
  name: string
  pay: number
  description: string
  hourlyRate: number
  weeklyHours: number
  benefitsIds?: UniqueEntityid[]
}

type createRoleUseCaseResponse = Either<null, { role: Role }>

export class CreateRoleUseCase {
  constructor(
    private roleRespository: RoleRepository,
    private employeeRepository: EmployeeRepository,
  ) {}

  async execute({
    employeesIds,
    name,
    pay,
    description,
    hourlyRate,
    weeklyHours,
    benefitsIds,
  }: CreateRoleUseCaseRequest): Promise<createRoleUseCaseResponse> {
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

    const role = Role.create({
      employeesIds,
      name,
      pay,
      description,
      hourlyRate,
      weeklyHours,
      benefitsIds,
    })

    await this.roleRespository.create(role)

    return right({ role })
  }
}
