import { InMemoryEmployeeRepository } from 'test/repositories/in-memory-employee.repository'
import { InMemoryRoleRepository } from 'test/repositories/in-memory-role.repository'
import { MakeEmployee } from 'test/factories/make-employee.factory'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { UpdateRoleUseCase } from './update-role.usecase'
import { MakeRole } from 'test/factories/make-role.fatory'

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
      employeesIds: [employee.id],
    })

    await inMemoryRoleRepository.create(role)

    const result = await sut.execute({
      roleId: role.id,
      employeesIds: [],
      name: 'Developer',
      pay: 5000,
      description: 'new role description',
      hourlyRate: 125,
      weeklyHours: 40,
      benefitsIds: [],
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.role.employeesIds).toHaveLength(0)
    expect(result.value?.role.name).toEqual('Developer')
  })
})
