import { Either, left, right } from '@/core/either'
import { Bank } from '../../enterprise/entities/bank'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { BankRepository } from '../repositories/bank.repository'
import { EmployeeRepository } from '../repositories/employee.repository'

interface createBankUseCaseRequest {
  employeeId: UniqueEntityid
  bankName: string
  agencyNumber: string
  accountNumber: string
}

type createBankUseCaseResponse = Either<null, { bank: Bank }>

export class CreateBankUseCase {
  constructor(
    private bankRepository: BankRepository,
    private employeeRepository: EmployeeRepository,
  ) {}

  async execute({
    employeeId,
    bankName,
    agencyNumber,
    accountNumber,
  }: createBankUseCaseRequest): Promise<createBankUseCaseResponse> {
    const employeeExists = await this.employeeRepository.findById(
      employeeId.toString(),
    )

    if (!employeeExists) return left(null)

    const bank = Bank.create({
      employeeId,
      bankName,
      agencyNumber,
      accountNumber,
    })

    await this.bankRepository.create(bank)

    return right({ bank })
  }
}
