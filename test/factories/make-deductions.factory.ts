import { UniqueEntityid } from 'core/entities/unique-entity-id'
import {
  Deductions,
  deductionsProps,
} from 'domain/sistem/enterprise/entities/deduction'
import { PrismaDeductionMapper } from 'infra/database/mappers/prisma-deduction.mapper'
import { PrismaService } from 'infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

export function MakeDeduction(
  overrride: Partial<deductionsProps> = {},
  id?: UniqueEntityid,
) {
  const deduction = Deductions.create(
    {
      employeeId: new UniqueEntityid(),
      reason: 'delay',
      date: new Date(),
      amount: faker.number.int(100),
      description: '',
      createdAt: new Date(),
      ...overrride,
    },
    id,
  )

  return deduction
}

@Injectable()
export class DeductionFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaDeduction(
    data: Partial<deductionsProps> = {},
  ): Promise<Deductions> {
    const deduction = MakeDeduction(data)

    await this.prisma.deduction.create({
      data: PrismaDeductionMapper.toPrisma(deduction),
    })

    return deduction
  }
}
