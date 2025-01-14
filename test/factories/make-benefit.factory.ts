import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import {
  Benefit,
  benefitProps,
} from '@/domain/sistem/enterprise/entities/benefit'

export function MakeBenefit(
  overrride: Partial<benefitProps> = {},
  id?: UniqueEntityid,
) {
  const role = Benefit.create(
    {
      roleId: [new UniqueEntityid()],
      name: '',
      value: 0,
      description: '',
      conditions: [],
      ...overrride,
    },
    id,
  )

  return role
}
