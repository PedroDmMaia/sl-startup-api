import { UniqueEntityid } from 'core/entities/unique-entity-id'
import {
  Benefit,
  benefitProps,
} from 'domain/sistem/enterprise/entities/benefit'
import { PrismaBenefitMapper } from 'infra/database/mappers/prisma-benefit.mapper'
import { PrismaService } from 'infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

export function MakeBenefit(
  overrride: Partial<benefitProps> = {},
  id?: UniqueEntityid,
) {
  const role = Benefit.create(
    {
      roleId: [new UniqueEntityid()],
      name: '',
      value: 0,
      description: '',
      conditions: '',
      ...overrride,
    },
    id,
  )

  return role
}

@Injectable()
export class BenefitFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaBenefit(data: Partial<benefitProps> = {}): Promise<Benefit> {
    const benefit = MakeBenefit(data)

    await this.prisma.benefit.create({
      data: PrismaBenefitMapper.toPrisma(benefit),
    })

    return benefit
  }
}
