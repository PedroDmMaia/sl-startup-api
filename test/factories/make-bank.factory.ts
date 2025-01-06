import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { Bank, bankProps } from '@/domain/sistem/enterprise/entities/bank'
import { faker } from '@faker-js/faker'

export function MakeBank(
  overrride: Partial<bankProps> = {},
  id?: UniqueEntityid,
) {
  const bank = Bank.create(
    {
      employeeId: new UniqueEntityid(),
      bankName: faker.company.name(),
      accountNumber: faker.finance.accountNumber(),
      agencyNumber: String(faker.number.int()),
      ...overrride,
    },
    id,
  )

  return bank
}
