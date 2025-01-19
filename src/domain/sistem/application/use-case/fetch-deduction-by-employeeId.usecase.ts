import { Either, left, right } from '@/core/either'
import { DeductionRepository } from '../repositories/deductions.repository'
import { Deductions } from '../../enterprise/entities/deduction'
import { Injectable } from '@nestjs/common'

interface FetchDeductionUseCaseResquest {
  employeeId: string
  page: number
}

type FetchDeductionUseCaseResponse = Either<null, { deductions: Deductions[] }>

@Injectable()
export class FetchDeductionUseCase {
  constructor(private deductionRepository: DeductionRepository) {}

  async execute({
    employeeId,
    page,
  }: FetchDeductionUseCaseResquest): Promise<FetchDeductionUseCaseResponse> {
    const deductions = await this.deductionRepository.findManyByEmployeeId(
      employeeId,
      { page },
    )

    if (!deductions) return left(null)

    return right({ deductions })
  }
}
