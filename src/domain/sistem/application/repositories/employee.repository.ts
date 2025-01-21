import { PaginationParams } from '@/core/types/pagination-params'
import { Employee } from '../../enterprise/entities/employee'

export abstract class EmployeeRepository {
  abstract create(employee: Employee): Promise<void>
  abstract update(employee: Employee): Promise<void>
  abstract delete(employee: Employee): Promise<void>
  abstract findById(id: string): Promise<Employee | null>
  abstract findByCpf(cpf: string): Promise<Employee | null>
  abstract findByRg(rg: string): Promise<Employee | null>
  abstract findByEmail(email: string): Promise<Employee | null>
  abstract SearchByName(
    params: PaginationParams,
    name?: string,
  ): Promise<Employee[]>
}
