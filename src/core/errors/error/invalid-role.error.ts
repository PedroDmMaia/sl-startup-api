import { UseCaseError } from '../use-case.error'

export class InvalidRolesError extends Error implements UseCaseError {
  constructor() {
    super(`One or more roles provided do not exist.`)
  }
}
