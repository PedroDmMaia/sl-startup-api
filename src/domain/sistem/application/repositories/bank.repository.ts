import { Bank } from '../../enterprise/entities/bank'

export abstract class BankRepository {
  abstract create(bank: Bank): Promise<void>
  abstract update(bank: Bank): Promise<void>
  abstract delete(id: string): Promise<void>
}
