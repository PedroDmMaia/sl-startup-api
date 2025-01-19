import { Either, left, right } from '@/core/either'
import { Bank } from '../../enterprise/entities/bank'
import { BankRepository } from '../repositories/bank.repository'
import { Injectable } from '@nestjs/common'

interface UpdateBankUseCaseResquest {
  employeeId: string
  bankName: string
  agencyNumber: string
  accountNumber: string
}

type UpdateBankUseCaseResponse = Either<null, { bank: Bank }>

@Injectable()
export class UpdateBankUseCase {
  constructor(private bankRepository: BankRepository) {}

  async execute({
    employeeId,
    bankName,
    accountNumber,
    agencyNumber,
  }: UpdateBankUseCaseResquest): Promise<UpdateBankUseCaseResponse> {
    const bank = await this.bankRepository.findByEmployeeId(
      employeeId.toString(),
    )

    if (!bank) {
      return left(null)
    }

    bank.bankName = bankName
    bank.accountNumber = accountNumber
    bank.agencyNumber = agencyNumber

    await this.bankRepository.update(bank)

    return right({ bank })
  }
}
