import { Either, right, left } from '@/core/either'
import { Deductions } from '../../enterprise/entities/deduction'
import { DeductionRepository } from '../repositories/deductions.repository'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { EmployeeRepository } from '../repositories/employee.repository'

interface createDeductionUseCaseRequest {
  employeeId: UniqueEntityid
  reason: string
  date: Date
  amount: number
  description: string
}

type createDeductionUseCaseResponse = Either<null, { deduction: Deductions }>

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
      employeeId,
      reason,
      date,
      amount,
      description,
    })

    await this.deductionRepository.create(deduction)

    return right({ deduction })
  }
}
