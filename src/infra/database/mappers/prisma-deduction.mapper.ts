import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { Deductions } from '@/domain/sistem/enterprise/entities/Deduction'
import { Prisma, Deduction as PrismaDeduction } from '@prisma/client'

export abstract class PrismaDeductionMapper {
  static toDomain(raw: PrismaDeduction): Deductions {
    return Deductions.create(
      {
        employeeId: new UniqueEntityid(raw.employeeId),
        reason: raw.reason,
        date: raw.date,
        amount: raw.amount,
        description: raw.description,
      },
      new UniqueEntityid(raw.id),
    )
  }

  static toPrisma(deduction: Deductions): Prisma.DeductionUncheckedCreateInput {
    return {
      id: deduction.id.toString(),
      employeeId: deduction.employeeId.toString(),
      reason: deduction.reason,
      date: deduction.date,
      amount: deduction.amount,
      description: deduction.description,
    }
  }
}
