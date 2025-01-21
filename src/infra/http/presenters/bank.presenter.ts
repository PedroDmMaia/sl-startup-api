import { Bank } from '@/domain/sistem/enterprise/entities/bank'

export class bankPresenter {
  static toHttp(bank: Bank) {
    return {
      id: bank.id.toString(),
      employeeId: bank.employeeId.toString(),
      bankName: bank.bankName,
      agencyNumber: bank.agencyNumber,
      accountNumber: bank.accountNumber,
      createdAt: bank.createdAt,
      updatedAt: bank.updatedAt,
    }
  }
}
