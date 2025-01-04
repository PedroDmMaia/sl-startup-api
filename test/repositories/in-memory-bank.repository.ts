import { BankRepository } from '@/domain/sistem/application/repositories/bank.repository'
import { EmployeeRepository } from '@/domain/sistem/application/repositories/employee.repository'
import { Bank } from '@/domain/sistem/enterprise/entities/bank'

export class InMemoryBankRepository implements BankRepository {
  constructor(private employeeRepository: EmployeeRepository) {}

  items: Bank[] = []
  async findById(id: string): Promise<Bank | null> {
    const bank = this.items.find((item) => item.id.toString() === id)

    if (!bank) return null

    return bank
  }

  async findByEmployeeId(id: string): Promise<Bank | null> {
    const employee = await this.employeeRepository.findById(id)

    if (!employee) return null

    const bank = this.items.find((item) => item.employeeId === employee.id)

    if (!bank) return null

    return bank
  }

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
