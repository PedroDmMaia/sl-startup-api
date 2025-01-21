import { Either, left, right } from '@/core/either'
import { BankRepository } from '../repositories/bank.repository'
import { Bank } from '../../enterprise/entities/bank'
import { Injectable } from '@nestjs/common'

interface FetchBankUseCaseResquest {
  employeeId: string
}

type FetchBankUseCaseResponse = Either<null, { bank: Bank }>

@Injectable()
export class FetchBankUseCase {
  constructor(private bankRepository: BankRepository) {}

  async execute({
    employeeId,
  }: FetchBankUseCaseResquest): Promise<FetchBankUseCaseResponse> {
    const bank = await this.bankRepository.findByEmployeeId(employeeId)

    if (!bank) return left(null)

    return right({ bank })
  }
}
