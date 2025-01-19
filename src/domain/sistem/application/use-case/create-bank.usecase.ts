import { Either, left, right } from '@/core/either'
import { Bank } from '../../enterprise/entities/bank'
import { BankRepository } from '../repositories/bank.repository'
import { EmployeeRepository } from '../repositories/employee.repository'
import { Injectable } from '@nestjs/common'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'

interface createBankUseCaseRequest {
  employeeId: string
  bankName: string
  agencyNumber: string
  accountNumber: string
}

type createBankUseCaseResponse = Either<null, { bank: Bank }>

@Injectable()
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
      employeeId: new UniqueEntityid(employeeId),
      bankName,
      agencyNumber,
      accountNumber,
    })

    await this.bankRepository.create(bank)

    return right({ bank })
  }
}
