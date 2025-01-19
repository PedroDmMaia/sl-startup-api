import { Either, right, left } from '@/core/either'
import { Deductions } from '../../enterprise/entities/deduction'
import { DeductionRepository } from '../repositories/deductions.repository'
import { EmployeeRepository } from '../repositories/employee.repository'
import { Injectable } from '@nestjs/common'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'

interface createDeductionUseCaseRequest {
  employeeId: string
  reason: string
  date: Date
  amount: number
  description: string
}

type createDeductionUseCaseResponse = Either<null, { deduction: Deductions }>

@Injectable()
export class CreateDeductionUseCase {
  constructor(
    private deductionRepository: DeductionRepository,
    private employeeRepository: EmployeeRepository,
  ) {}

  async execute({
    employeeId,
    reason,
    date,
    amount,
    description,
  }: createDeductionUseCaseRequest): Promise<createDeductionUseCaseResponse> {
    const employeeExistis = await this.employeeRepository.findById(
      employeeId.toString(),
    )

    if (!employeeExistis) return left(null)

    const deduction = Deductions.create({
      employeeId: new UniqueEntityid(employeeId),
      reason,
      date,
      amount,
      description,
    })

    await this.deductionRepository.create(deduction)

    return right({ deduction })
  }
}
