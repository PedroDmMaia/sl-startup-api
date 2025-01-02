import { Deductions } from '../../enterprise/entities/deduction'

export abstract class DeductionRepository {
  abstract create(deductions: Deductions): Promise<void>
  abstract update(deductions: Deductions): Promise<void>
  abstract delete(id: string): Promise<void>
  abstract findById(id: string): Promise<Deductions | null>
  abstract findManyByEmployeeId(id: string): Promise<Deductions[] | null>
}
