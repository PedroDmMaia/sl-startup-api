import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { Role, roleProps } from '@/domain/sistem/enterprise/entities/role'
import { faker } from '@faker-js/faker'

export function MakeRole(
  overrride: Partial<roleProps> = {},
  id?: UniqueEntityid,
) {
  const role = Role.create(
    {
      employeesIds: [],
      name: faker.person.jobType(),
      description: faker.person.jobDescriptor(),
      hourlyRate: 30,
      weeklyHours: 40,
      pay: 1200,
      benefitsIds: [],
      ...overrride,
    },
    id,
  )

  return role
}
