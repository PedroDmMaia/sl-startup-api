import { UseCaseError } from '../use-case.error'

export class UserWithSameInformationError
  extends Error
  implements UseCaseError
{
  constructor() {
    super("employee's with the same information")
  }
}
