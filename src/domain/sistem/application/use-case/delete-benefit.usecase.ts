import { Either, left, right } from '@/core/either'
import { BenefitRepository } from '../repositories/benefit.repository'
import { BenefitNotFoundError } from '@/core/errors/error/resource-not-found.error'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'

interface deleteBenefitUseCaseResquest {
  benefitId: UniqueEntityid
}

type deleteBenefitUseCaseResponse = Either<BenefitNotFoundError, null>

export class DeleteBenefitUseCase {
  constructor(private benefitRepository: BenefitRepository) {}

  async execute({
    benefitId,
  }: deleteBenefitUseCaseResquest): Promise<deleteBenefitUseCaseResponse> {
    const benefit = await this.benefitRepository.findById(benefitId.toString())
    if (!benefit) {
      return left(new BenefitNotFoundError())
    }

    await this.benefitRepository.delete(benefitId.toString())

    return right(null)
  }
}
