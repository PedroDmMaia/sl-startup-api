import { Either, right } from '@/core/either'
import { BenefitRepository } from '../repositories/benefit.repository'
import { Benefit } from '../../enterprise/entities/benefit'

interface FetchBenefitUseCaseResquest {
  page: number
}

type FetchBenefitUseCaseResponse = Either<null, { benefit: Benefit[] }>

export class FetchBenefitUseCase {
  constructor(private benefitRepository: BenefitRepository) {}

  async execute({
    page,
  }: FetchBenefitUseCaseResquest): Promise<FetchBenefitUseCaseResponse> {
    const benefit = await this.benefitRepository.listAll({ page })

    return right({ benefit })
  }
}
