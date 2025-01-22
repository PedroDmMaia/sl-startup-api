import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { Bank } from '@/domain/sistem/enterprise/entities/bank'
import { Prisma, Bank as PrismaBank } from '@prisma/client'

export abstract class PrismaBankMapper {
  static toDomain(raw: PrismaBank): Bank {
    return Bank.create(
      {
        employeeId: new UniqueEntityid(raw.employeeId),
        bankName: raw.bankName,
        agencyNumber: raw.agencyNumber,
        accountNumber: raw.accountNumber,
      },
      new UniqueEntityid(raw.id),
    )
  }

  static toPrisma(bank: Bank): Prisma.BankUncheckedCreateInput {
    return {
      id: bank.id.toString(),
      employeeId: bank.employeeId.toString(),
      bankName: bank.bankName,
      agencyNumber: bank.agencyNumber,
      accountNumber: bank.accountNumber,
    }
  }
}
