import { UseCaseError } from '../use-case.error'

export class BenefitNotFoundError extends Error implements UseCaseError {
  constructor() {
    super(`Benefit was not found.`)
  }
}
