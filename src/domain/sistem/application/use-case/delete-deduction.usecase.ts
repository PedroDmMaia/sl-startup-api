import { Either, left, right } from '@/core/either'
import { DeductionRepository } from '../repositories/deductions.repository'
import { Injectable } from '@nestjs/common'

interface DeleteDeductionUseCaseRequest {
  deductionId: string
}

type DeleteDeductionUseCaseResponse = Either<null, null>

@Injectable()
export class DeleteDeductionUseCase {
  constructor(private deductionRepository: DeductionRepository) {}

  async execute({
    deductionId,
  }: DeleteDeductionUseCaseRequest): Promise<DeleteDeductionUseCaseResponse> {
    const deduction = await this.deductionRepository.findById(
      deductionId.toString(),
    )

    if (!deduction) return left(null)

    await this.deductionRepository.delete(deduction.id.toString())

    return right(null)
  }
}
