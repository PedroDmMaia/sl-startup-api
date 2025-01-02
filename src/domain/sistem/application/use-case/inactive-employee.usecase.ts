import { EmployeeRepository } from '../repositories/employee.repository'

interface InactiveEmployeeUseCaseResquest {
  id: string
}

export class InactiveEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}
  async exeute({ id }: InactiveEmployeeUseCaseResquest) {
    const employee = await this.employeeRepository.findById(id)

    if (!employee) {
      throw new Error('Employee not found')
    }

    employee.isActive = false

    await this.employeeRepository.inactive(employee)
  }
}
