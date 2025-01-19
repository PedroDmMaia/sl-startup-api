import { Either, left, right } from '@/core/either'
import { BenefitRepository } from '../repositories/benefit.repository'
import { BenefitNotFoundError } from '@/core/errors/error/resource-not-found.error'
import { Injectable } from '@nestjs/common'

interface deleteBenefitUseCaseResquest {
  benefitId: string
}

type deleteBenefitUseCaseResponse = Either<BenefitNotFoundError, null>

@Injectable()
export class DeleteBenefitUseCase {
  constructor(private benefitRepository: BenefitRepository) {}

  async execute({
    benefitId,
  }: deleteBenefitUseCaseResquest): Promise<deleteBenefitUseCaseResponse> {
    const benefit = await this.benefitRepository.findById(benefitId)
    if (!benefit) {
      return left(new BenefitNotFoundError())
    }

    await this.benefitRepository.delete(benefitId.toString())

    return right(null)
  }
}
