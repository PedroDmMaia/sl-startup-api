import { InMemoryEmployeeRepository } from 'test/repositories/in-memory-employee.repository'
import { InMemoryDeductionRepository } from 'test/repositories/in-memory-deductions.repository'
import { CreateDeductionUseCase } from './create-deductions.usecase'
import { MakeEmployee } from 'test/factories/make-employee.factory'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'

let inMemoryEmployeeRepository: InMemoryEmployeeRepository
let inMemoryDeductionRepository: InMemoryDeductionRepository

let sut: CreateDeductionUseCase
describe('create deduction test', () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository()
    inMemoryDeductionRepository = new InMemoryDeductionRepository()

    sut = new CreateDeductionUseCase(
      inMemoryDeductionRepository,
      inMemoryEmployeeRepository,
    )
  })

  it('should be able to create a deduction', async () => {
    const employee = MakeEmployee({}, new UniqueEntityid('employee-1'))

    await inMemoryEmployeeRepository.create(employee)

    const result = await sut.execute({
      employeeId: employee.id.toString(),
      reason: 'Sickness',
      date: new Date(),
      amount: 50,
      description: 'Sick leave',
    })

    expect(result.isRight()).toBe(true)
  })

  it('should not be able to create a deduction with a wrong employeeId', async () => {
    const employee = MakeEmployee({}, new UniqueEntityid('employee-1'))

    await inMemoryEmployeeRepository.create(employee)

    const result = await sut.execute({
      employeeId: 'employee-2',
      reason: 'Sickness',
      date: new Date(),
      amount: 50,
      description: 'Sick leave',
    })

    expect(result.isLeft()).toBe(true)
  })
})
