import { EmployeeRepository } from '../repositories/employee.repository'

interface UpdateEmployeeUseCaseResquest {
  employeeId: string
  name: string
  cpf: string
  rg: string
  email: string
  phoneNumber: string
  isActive: boolean
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
    isActive,
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
    employee.isActive = isActive

    await this.employeeRepository.update(employee)
  }
}
