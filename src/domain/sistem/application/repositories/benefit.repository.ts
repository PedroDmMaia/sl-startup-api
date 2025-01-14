import { PaginationParams } from '@/core/types/pagination-params'
import { Benefit } from '../../enterprise/entities/benefit'

export abstract class BenefitRepository {
  abstract create(benefit: Benefit): Promise<void>
  abstract update(benefit: Benefit): Promise<void>
  abstract delete(id: string): Promise<void>
  abstract findById(id: string): Promise<Benefit | null>
  abstract listAll(params: PaginationParams): Promise<Benefit[]>
}
