import { PaginationParams } from '@/core/types/pagination-params'
import { Role } from '../../enterprise/entities/role'

export abstract class RoleRepository {
  abstract create(role: Role): Promise<void>
  abstract update(role: Role): Promise<void>
  abstract delete(id: string): Promise<void>
  abstract findById(id: string): Promise<Role | null>
  abstract findByEmployeeId(employeeId: string): Promise<Role | null>
  abstract listAll(params: PaginationParams): Promise<Role[]>
}
