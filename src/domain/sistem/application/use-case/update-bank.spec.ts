import { InMemoryEmployeeRepository } from 'test/repositories/in-memory-employee.repository'
import { MakeBank } from 'test/factories/make-bank.factory'
import { InMemoryBankRepository } from 'test/repositories/in-memory-bank.repository'
import { UpdateBankUseCase } from './update-bank.usecase'
import { MakeEmployee } from 'test/factories/make-employee.factory'

let inMemoryEmployeeRepository: InMemoryEmployeeRepository
let inMemoryBankRepository: InMemoryBankRepository

let sut: UpdateBankUseCase
describe('update bank details test', () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository()
    inMemoryBankRepository = new InMemoryBankRepository(
      inMemoryEmployeeRepository,
    )
    sut = new UpdateBankUseCase(inMemoryBankRepository)
  })

  it('should be able to update a bank details', async () => {
    const employee = MakeEmployee()
    await inMemoryEmployeeRepository.create(employee)

    const bank = MakeBank({
      employeeId: employee.id,
      bankName: 'any bank name',
    })
    await inMemoryBankRepository.create(bank)

    const result = await sut.execute({
      employeeId: bank.employeeId,
      bankName: 'New Bank',
      accountNumber: '1234567890',
      agencyNumber: '1234',
    })

    expect(result.value?.bank.bankName).toEqual('New Bank')
  })
})
