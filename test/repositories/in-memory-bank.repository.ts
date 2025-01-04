import { BankRepository } from '@/domain/sistem/application/repositories/bank.repository'
import { Bank } from '@/domain/sistem/enterprise/entities/bank'

export class InMemoryBankRepository implements BankRepository {
  items: Bank[] = []

  async create(bank: Bank): Promise<void> {
    this.items.push(bank)
  }

  async update(bank: Bank): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === bank.id)

    this.items[itemIndex] = bank
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id)

    this.items.splice(itemIndex, 1)
  }
}
