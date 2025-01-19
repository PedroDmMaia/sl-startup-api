import { Either, right } from '@/core/either'
import { EmployeeRepository } from '../repositories/employee.repository'
import { Injectable } from '@nestjs/common'

interface deleteEmployeeUseCaseResquest {
  id: string
}

type deleteEmployeeUseCaseResponse = Either<null, null>

@Injectable()
export class DeleteEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute({
    id,
  }: deleteEmployeeUseCaseResquest): Promise<deleteEmployeeUseCaseResponse> {
    const employee = await this.employeeRepository.findById(id)

    if (!employee) {
      throw new Error('Employee not found')
    }

    await this.employeeRepository.delete(employee)

    return right(null)
  }
}
