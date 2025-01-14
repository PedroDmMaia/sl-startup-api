import { EmployeeRepository } from '@/domain/sistem/application/repositories/employee.repository'
import { UserRepository } from '@/domain/sistem/application/repositories/user.repository'
import { User } from '@/domain/sistem/enterprise/entities/user'

export class InMemoryUserRepository implements UserRepository {
  constructor(private employeeRepository: EmployeeRepository) {}

  items: User[] = []
  async create(user: User): Promise<void> {
    this.items.push(user)
  }

  async update(user: User): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === user.id)

    this.items[itemIndex] = user
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id.toString() === id)

    this.items.splice(itemIndex, 1)
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id.toString() === id)

    if (!user) return null

    return user
  }

  async findByName(userName: string): Promise<User | null> {
    const user = this.items.find((item) => item.userName === userName)

    if (!user) return null

    return user
  }

  async findByEmployeeId(id: string): Promise<User | null> {
    const employee = await this.employeeRepository.findById(id)

    if (!employee) return null

    const user = this.items.find((item) => item.employeeId === employee.id)

    if (!user) return null

    return user
  }
}
