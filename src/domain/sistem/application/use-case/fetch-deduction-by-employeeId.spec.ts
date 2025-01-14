import { InMemoryEmployeeRepository } from 'test/repositories/in-memory-employee.repository'
import { MakeEmployee } from 'test/factories/make-employee.factory'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { FetchDeductionUseCase } from './fetch-deduction-by-employeeId.usecase'
import { InMemoryDeductionRepository } from 'test/repositories/in-memory-deductions.repository'
import { MakeDeduction } from 'test/factories/make-deductions.factory'

let inMemoryEmployeeRepository: InMemoryEmployeeRepository
let inMemoryDeductionRepository: InMemoryDeductionRepository

let sut: FetchDeductionUseCase
describe('fetch deductions by employeeId test', () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository()
    inMemoryDeductionRepository = new InMemoryDeductionRepository()

    sut = new FetchDeductionUseCase(inMemoryDeductionRepository)
  })

  it('should be able to fetch deductions by employeeId', async () => {
    await inMemoryEmployeeRepository.create(
      MakeEmployee({}, new UniqueEntityid('employee-01')),
    )

    await inMemoryDeductionRepository.create(
      MakeDeduction({
        employeeId: new UniqueEntityid('employee-01'),
      }),
    )

    await inMemoryDeductionRepository.create(
      MakeDeduction({
        employeeId: new UniqueEntityid('employee-01'),
      }),
    )

    await inMemoryDeductionRepository.create(
      MakeDeduction({
        employeeId: new UniqueEntityid('employee-01'),
      }),
    )

    const result = await sut.execute({
      employeeId: 'employee-01',
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.deductions).toHaveLength(3)
  })
})
