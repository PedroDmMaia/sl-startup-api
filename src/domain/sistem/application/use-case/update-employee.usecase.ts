import { EmployeeRepository } from '../repositories/employee.repository'

interface UpdateEmployeeUseCaseResquest {
  employeeId: string
  name: string
  cpf: string
  rg: string
  email: string
  phoneNumber: string
}

export class UpdateEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async exeute({
    employeeId,
    name,
    cpf,
    rg,
    email,
    phoneNumber,
  }: UpdateEmployeeUseCaseResquest) {
    const employee = await this.employeeRepository.findById(employeeId)

    if (!employee) {
      throw new Error('Employee not found')
    }

    employee.name = name
    employee.cpf = cpf
    employee.rg = rg
    employee.email = email
    employee.phoneNumber = phoneNumber

    await this.employeeRepository.update(employee)
  }
}
