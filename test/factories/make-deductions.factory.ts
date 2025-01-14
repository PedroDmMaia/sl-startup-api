import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import {
  Deductions,
  deductionsProps,
} from '@/domain/sistem/enterprise/entities/deduction'
import { faker } from '@faker-js/faker'

export function MakeDeduction(
  overrride: Partial<deductionsProps> = {},
  id?: UniqueEntityid,
) {
  const role = Deductions.create(
    {
      employeeId: new UniqueEntityid(),
      reason: 'delay',
      date: new Date(),
      amount: faker.number.int(100),
      description: '',
      createdAt: new Date(),
      ...overrride,
    },
    id,
  )

  return role
}
