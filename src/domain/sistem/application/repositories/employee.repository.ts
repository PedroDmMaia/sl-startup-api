import { Employee } from '../../enterprise/entities/employee'

export abstract class EmployeeRepository {
  abstract create(employee: Employee): Promise<void>
  abstract update(employee: Employee): Promise<void>
  abstract inactive(employee: Employee): Promise<void>
  abstract findById(id: string): Promise<Employee | null>
}
