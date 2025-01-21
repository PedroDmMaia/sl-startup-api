import { Either, right } from '@/core/either'
import { BenefitRepository } from '../repositories/benefit.repository'
import { Benefit } from '../../enterprise/entities/benefit'
import { Injectable } from '@nestjs/common'

interface FetchBenefitUseCaseResquest {
  page: number
  name?: string
}

type FetchBenefitUseCaseResponse = Either<null, { benefit: Benefit[] }>

@Injectable()
export class FetchBenefitUseCase {
  constructor(private benefitRepository: BenefitRepository) {}

  async execute({
    page,
    name,
  }: FetchBenefitUseCaseResquest): Promise<FetchBenefitUseCaseResponse> {
    const benefit = await this.benefitRepository.SearchByName({ page }, name)

    return right({ benefit })
  }
}
