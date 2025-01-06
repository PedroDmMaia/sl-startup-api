import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { User, userProps } from '@/domain/sistem/enterprise/entities/user'
import { faker } from '@faker-js/faker'

export function MakeUser(
  overrride: Partial<userProps> = {},
  id?: UniqueEntityid,
) {
  const user = User.create(
    {
      employeeId: new UniqueEntityid(),
      userName: faker.internet.displayName(),
      password: faker.internet.password(),
      isActive: true,
      ...overrride,
    },
    id,
  )

  return user
}
