import { Either, left, right } from '@/core/either'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { DeductionRepository } from '../repositories/deductions.repository'

interface DeleteDeductionUseCaseRequest {
  deductionId: UniqueEntityid
}

type DeleteDeductionUseCaseResponse = Either<null, null>

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
