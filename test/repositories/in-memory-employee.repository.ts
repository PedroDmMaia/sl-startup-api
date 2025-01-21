import { PaginationParams } from '@/core/types/pagination-params'
import { EmployeeRepository } from '@/domain/sistem/application/repositories/employee.repository'
import { Employee } from '@/domain/sistem/enterprise/entities/employee'

export class InMemoryEmployeeRepository implements EmployeeRepository {
  items: Employee[] = []
  async create(employee: Employee): Promise<void> {
    this.items.push(employee)
  }

  async update(employee: Employee): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === employee.id)

    this.items[itemIndex] = employee
  }

  async delete(employee: Employee): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === employee.id)

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string): Promise<Employee | null> {
    const employee = this.items.find((item) => item.id.toString() === id)

    if (!employee) return null

    return employee
  }

  async findByCpf(cpf: string): Promise<Employee | null> {
    const employee = this.items.find((item) => item.cpf === cpf)

    if (!employee) return null

    return employee
  }

  async findByRg(rg: string): Promise<Employee | null> {
    const employee = this.items.find((item) => item.rg === rg)

    if (!employee) return null

    return employee
  }

  async findByEmail(email: string): Promise<Employee | null> {
    const employee = this.items.find((item) => item.email === email)

    if (!employee) return null

    return employee
  }

  async SearchByName(
    params: PaginationParams,
    name?: string,
  ): Promise<Employee[]> {
    const filteredItems = name
      ? this.items.filter((item) =>
          item.name.trim().toLowerCase().startsWith(name.trim().toLowerCase()),
        )
      : this.items

    return filteredItems.slice((params.page - 1) * 20, params.page * 20)
  }
}
