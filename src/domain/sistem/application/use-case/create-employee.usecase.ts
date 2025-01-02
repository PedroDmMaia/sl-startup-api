import { Employee } from '../../enterprise/entities/employee'
import { EmployeeRepository } from '../repositories/employee.repository'

interface CreateEmployeeUseCaseResquest {
  name: string
  cpf: string
  rg: string
  email: string
  phoneNumber: string
}

export class CreateEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async exeute({
    name,
    cpf,
    rg,
    email,
    phoneNumber,
  }: CreateEmployeeUseCaseResquest) {
    const employee = Employee.create({
      name,
      cpf,
      rg,
      email,
      phoneNumber,
    })

    await this.employeeRepository.create(employee)
  }
}
