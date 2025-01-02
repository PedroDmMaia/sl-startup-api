import { Role } from '../../enterprise/entities/role'

export abstract class RoleRepository {
  abstract create(role: Role): Promise<void>
  abstract update(role: Role): Promise<void>
  abstract delete(id: string): Promise<void>
  abstract findById(id: string): Promise<Role | null>
}
