import { InMemoryEmployeeRepository } from 'test/repositories/in-memory-employee.repository'
import { InMemoryRoleRepository } from 'test/repositories/in-memory-role.repository'
import { CreateRoleUseCase } from './create-role.usecase'
import { MakeEmployee } from 'test/factories/make-employee.factory'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { MakeBenefit } from 'test/factories/make-benefit.factory'
import { InMemoryBenefitRepository } from 'test/repositories/in-memory-benfit.repository'

let inMemoryRoleRepository: InMemoryRoleRepository
let inMemoryEmployeeRepository: InMemoryEmployeeRepository
let inMemoryBenefitRepository: InMemoryBenefitRepository

let sut: CreateRoleUseCase

describe('crete role test', async () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository()
    inMemoryRoleRepository = new InMemoryRoleRepository()
    inMemoryBenefitRepository = new InMemoryBenefitRepository()

    sut = new CreateRoleUseCase(
      inMemoryRoleRepository,
      inMemoryEmployeeRepository,
    )
  })

  it('shoud be able create a role', async () => {
    const employee = MakeEmployee({}, new UniqueEntityid('employee-1'))
    await inMemoryEmployeeRepository.create(employee)

    const benefit = MakeBenefit({}, new UniqueEntityid('benefit-1'))
    await inMemoryBenefitRepository.create(benefit)

    const result = await sut.execute({
      employeeId: employee.id.toString(),
      name: 'Manager',
      pay: 1000,
      description: 'Gerente',
      hourlyRate: 20,
      weeklyHours: 40,
      benefitsIds: [benefit.id.toString()],
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.role.employeeId.toString()).toEqual('employee-1')
    expect(result.value?.role.benefitsIds[0].toString()).toEqual('benefit-1')
  })
})
