import { Either, right } from '@/core/either'
import { EmployeeRepository } from '../repositories/employee.repository'
import { Employee } from '../../enterprise/entities/employee'
import { Injectable } from '@nestjs/common'

interface FetchEmployeeUseCaseResquest {
  page: number
}

type FetchEmployeeUseCaseResponse = Either<null, { employee: Employee[] }>

@Injectable()
export class FetchEmployeeUseCase {
  constructor(private employeeRepository: EmployeeRepository) {}

  async execute({
    page,
  }: FetchEmployeeUseCaseResquest): Promise<FetchEmployeeUseCaseResponse> {
    const employee = await this.employeeRepository.listAll({ page })

    return right({ employee })
  }
}
