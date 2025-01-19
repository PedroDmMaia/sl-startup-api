import { UseCaseError } from '@/core/errors/use-case.error'

export class EmployeeNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Employee not found in database')
  }
}
