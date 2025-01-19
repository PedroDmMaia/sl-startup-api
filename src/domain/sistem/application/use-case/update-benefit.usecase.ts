import { Either, left, right } from '@/core/either'
import { Benefit } from '../../enterprise/entities/benefit'
import { BenefitRepository } from '../repositories/benefit.repository'
import { Injectable } from '@nestjs/common'

interface UpdateBenefitUseCaseResquest {
  benefitId: string
  name: string
  value: number
  description?: string
  conditions?: string
}

type UpdateBenefitUseCaseResponse = Either<null, { benefit: Benefit }>

@Injectable()
export class UpdateBenefitUseCase {
  constructor(private benefitRepository: BenefitRepository) {}

  async execute({
    benefitId,
    name,
    value,
    description,
    conditions,
  }: UpdateBenefitUseCaseResquest): Promise<UpdateBenefitUseCaseResponse> {
    const benefit = await this.benefitRepository.findById(benefitId.toString())
    if (!benefit) {
      return left(null)
    }

    benefit.name = name
    benefit.value = value
    benefit.description = description ?? benefit.description
    benefit.conditions = conditions ?? benefit.conditions

    await this.benefitRepository.update(benefit)

    return right({ benefit })
  }
}
