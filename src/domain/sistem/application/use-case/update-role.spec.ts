import { InMemoryEmployeeRepository } from 'test/repositories/in-memory-employee.repository'
import { InMemoryRoleRepository } from 'test/repositories/in-memory-role.repository'
import { MakeEmployee } from 'test/factories/make-employee.factory'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { UpdateRoleUseCase } from './update-role.usecase'
import { MakeRole } from 'test/factories/make-role.fatory'
import { MakeBenefit } from 'test/factories/make-benefit.factory'

let inMemoryRoleRepository: InMemoryRoleRepository
let inMemoryEmployeeRepository: InMemoryEmployeeRepository

let sut: UpdateRoleUseCase

describe('update role test', async () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository()
    inMemoryRoleRepository = new InMemoryRoleRepository()

    sut = new UpdateRoleUseCase(
      inMemoryRoleRepository,
      inMemoryEmployeeRepository,
    )
  })

  it('shoud be able update a role', async () => {
    const employee = MakeEmployee({}, new UniqueEntityid('employee-1'))
    await inMemoryEmployeeRepository.create(employee)

    const role = MakeRole({
      employeeId: employee.id.toString(),
    })

    const benefit = MakeBenefit(
      {
        name: 'vale refeicao',
        roleId: [role.id],
      },
      new UniqueEntityid('benefit-1'),
    )

    await inMemoryRoleRepository.create(role)

    const result = await sut.execute({
      roleId: role.id.toString(),
      employeeId: employee.id.toString(),
      name: 'Developer',
      pay: 5000,
      description: 'new role description',
      hourlyRate: 125,
      weeklyHours: 40,
      benefitsIds: [benefit.id.toString()],
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.role.name).toEqual('Developer')
    expect(result.value?.role.benefitsIds[0].toString()).toEqual('benefit-1')
  })
})
