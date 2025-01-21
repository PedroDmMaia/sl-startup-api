import { Employee } from '@/domain/sistem/enterprise/entities/employee'

export class employeePresenter {
  static toHttp(employee: Employee) {
    return {
      id: employee.id.toString(),
      name: employee.name,
      email: employee.email,
      password: employee.password,
      cpf: employee.cpf,
      rg: employee.rg,
      phoneNumber: employee.phoneNumber,
      isActive: employee.isActive,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt,
    }
  }
}
