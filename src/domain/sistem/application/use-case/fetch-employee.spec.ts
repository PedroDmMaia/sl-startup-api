import { InMemoryEmployeeRepository } from 'test/repositories/in-memory-employee.repository'
import { MakeEmployee } from 'test/factories/make-employee.factory'
import { FetchEmployeeUseCase } from './fetch-employee.usecase'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'

let inMemoryEmployeeRepository: InMemoryEmployeeRepository

let sut: FetchEmployeeUseCase
describe('fetch employee test', () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository()

    sut = new FetchEmployeeUseCase(inMemoryEmployeeRepository)
  })

  it('should be able to fetch employee', async () => {
    await inMemoryEmployeeRepository.create(
      MakeEmployee({}, new UniqueEntityid('employee-01')),
    )
    await inMemoryEmployeeRepository.create(
      MakeEmployee({}, new UniqueEntityid('employee-02')),
    )
    await inMemoryEmployeeRepository.create(
      MakeEmployee({}, new UniqueEntityid('employee-03')),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.employee).toHaveLength(3)
  })
})
