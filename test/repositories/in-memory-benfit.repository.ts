import { PaginationParams } from '@/core/types/pagination-params'
import { BenefitRepository } from '@/domain/sistem/application/repositories/benefit.repository'
import { Benefit } from '@/domain/sistem/enterprise/entities/benefit'

export class InMemoryBenefitRepository implements BenefitRepository {
  items: Benefit[] = []
  async create(benefit: Benefit): Promise<void> {
    this.items.push(benefit)
  }

  async update(benefit: Benefit): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === benefit.id)

    this.items[itemIndex] = benefit
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id)

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string): Promise<Benefit | null> {
    const benefit = this.items.find((item) => item.id.toString() === id)

    return benefit || null
  }

  async SearchByName(
    params: PaginationParams,
    name?: string,
  ): Promise<Benefit[]> {
    const filteredItems = name
      ? this.items.filter((item) =>
          item.name.trim().toLowerCase().startsWith(name.trim().toLowerCase()),
        )
      : this.items

    return filteredItems.slice((params.page - 1) * 20, params.page * 20)
  }
}
