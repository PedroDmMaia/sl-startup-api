import { FetchBankUseCase } from './fetch-bank-details.usecase'
import { InMemoryBankRepository } from 'test/repositories/in-memory-bank.repository'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { MakeBank } from 'test/factories/make-bank.factory'
import { InMemoryEmployeeRepository } from 'test/repositories/in-memory-employee.repository'
import { MakeEmployee } from 'test/factories/make-employee.factory'

let inMemoryBankRepository: InMemoryBankRepository
let inMemoryEmployeeRepository: InMemoryEmployeeRepository

let sut: FetchBankUseCase
describe('fetch bank test', () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository()
    inMemoryBankRepository = new InMemoryBankRepository(
      inMemoryEmployeeRepository,
    )

    sut = new FetchBankUseCase(inMemoryBankRepository)
  })

  it('should be able to fetch bank', async () => {
    const employee = MakeEmployee({}, new UniqueEntityid('emlpoyee-1'))

    inMemoryEmployeeRepository.create(employee)

    inMemoryBankRepository.create(
      MakeBank({
        employeeId: employee.id,
        bankName: 'anyBank',
      }),
    )

    const result = await sut.execute({
      employeeId: employee.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.bank.bankName).toEqual('anyBank')
  })
})
