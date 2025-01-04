import { Bank } from '../../enterprise/entities/bank'

export abstract class BankRepository {
  abstract create(bank: Bank): Promise<void>
  abstract update(bank: Bank): Promise<void>
  abstract delete(id: string): Promise<void>
  abstract findById(id: string): Promise<Bank | null>
  abstract findByEmployeeId(id: string): Promise<Bank | null>
}
