import { Deductions } from '@/domain/sistem/enterprise/entities/deduction'

export class deductionPresenter {
  static toHttp(deduction: Deductions) {
    return {
      id: deduction.id.toString(),
      employeeId: deduction.employeeId.toString(),
      reason: deduction.reason,
      date: deduction.date.toISOString(),
      amount: deduction.amount,
      description: deduction.description,
      createdAt: deduction.createdAt.toISOString(),
      updatedAt: deduction.updatedAt?.toISOString(),
    }
  }
}
