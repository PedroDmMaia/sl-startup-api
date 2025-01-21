import { PaginationParams } from '@/core/types/pagination-params'
import { RoleRepository } from '@/domain/sistem/application/repositories/role.repository'
import { Role } from '@/domain/sistem/enterprise/entities/role'

export class InMemoryRoleRepository implements RoleRepository {
  items: Role[] = []
  async create(role: Role): Promise<void> {
    this.items.push(role)
  }

  async update(role: Role): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === role.id)

    this.items[itemIndex] = role
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id)

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string): Promise<Role | null> {
    const role = this.items.find((item) => item.id.toString() === id)

    if (!role) return null

    return role
  }

  async findByEmployeeId(employeeId: string): Promise<Role | null> {
    const role = this.items.find((item) => item.employeeId === employeeId)

    if (!role) return null

    return role
  }

  async SearchByName(params: PaginationParams, name?: string): Promise<Role[]> {
    const filteredItems = name
      ? this.items.filter((item) =>
          item.name.trim().toLowerCase().startsWith(name.trim().toLowerCase()),
        )
      : this.items

    return filteredItems.slice((params.page - 1) * 20, params.page * 20)
  }
}
