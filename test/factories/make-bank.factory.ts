import { UniqueEntityid } from 'core/entities/unique-entity-id'
import { Bank, bankProps } from 'domain/sistem/enterprise/entities/bank'
import { PrismaBankMapper } from 'infra/database/mappers/prisma-bank.mapper'
import { PrismaService } from 'infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

export function MakeBank(
  overrride: Partial<bankProps> = {},
  id?: UniqueEntityid,
) {
  const bank = Bank.create(
    {
      employeeId: new UniqueEntityid(),
      bankName: faker.company.name(),
      accountNumber: faker.finance.accountNumber(),
      agencyNumber: String(faker.number.int()),
      ...overrride,
    },
    id,
  )

  return bank
}

@Injectable()
export class BankFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaBank(data: Partial<bankProps> = {}): Promise<Bank> {
    const bank = MakeBank(data)

    await this.prisma.bank.create({
      data: PrismaBankMapper.toPrisma(bank),
    })

    return bank
  }
}
