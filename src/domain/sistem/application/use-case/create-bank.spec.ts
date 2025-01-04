import { InMemoryEmployeeRepository } from 'test/repositories/in-memory-employee.repository'
import { CreateBankUseCase } from './create-bank.usecase'
import { InMemoryBankRepository } from 'test/repositories/in-memory-bank.repository'
import { MakeEmployee } from 'test/factories/make-employee.factory'

let inMemoryBankRepository: InMemoryBankRepository
let inMemoryEmployeeRepository: InMemoryEmployeeRepository

let sut: CreateBankUseCase
describe('create bank test', () => {
  beforeEach(() => {
    inMemoryBankRepository = new InMemoryBankRepository()
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository()

    sut = new CreateBankUseCase(
      inMemoryBankRepository,
      inMemoryEmployeeRepository,
    )
  })

  it('should be able to create a bank details', async () => {
    const employee = MakeEmployee()

    await inMemoryEmployeeRepository.create(employee)

    const result = await sut.execute({
      empoyeeId: employee.id,
      bankName: 'Banco do Brasil',
      agencyNumber: '1234',
      accountNumber: '567890',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryBankRepository.items[0]).toEqual(result.value?.bank)
    expect(inMemoryBankRepository.items).toHaveLength(1)
  })
})
