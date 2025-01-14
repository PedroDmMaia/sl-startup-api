import { PaginationParams } from '@/core/types/pagination-params'
import { DeductionRepository } from '@/domain/sistem/application/repositories/deductions.repository'
import { Deductions } from '@/domain/sistem/enterprise/entities/deduction'

export class InMemoryDeductionRepository implements DeductionRepository {
  items: Deductions[] = []

  async create(deductions: Deductions): Promise<void> {
    this.items.push(deductions)
  }

  async update(deductions: Deductions): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === deductions.id)

    this.items[itemIndex] = deductions
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id)

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string): Promise<Deductions | null> {
    const deduction = this.items.find((item) => item.id.toString() === id)

    return deduction || null
  }

  async findManyByEmployeeId(
    employeeId: string,
    params: PaginationParams,
  ): Promise<Deductions[] | null> {
    const deductions = this.items
      .filter((item) => item.employeeId.toString() === employeeId)
      .slice((params.page - 1) * 20, params.page * 20)

    return deductions || null
  }
}
