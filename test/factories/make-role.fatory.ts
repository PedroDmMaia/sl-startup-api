import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { Role, roleProps } from '@/domain/sistem/enterprise/entities/role'
import { PrismaRoleMapper } from '@/infra/database/mappers/prisma-role.mapper'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

export function MakeRole(
  overrride: Partial<roleProps> = {},
  id?: UniqueEntityid,
) {
  const role = Role.create(
    {
      employeeId: '',
      name: 'rh',
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

@Injectable()
export class RoleFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaRole(data: Partial<roleProps> = {}): Promise<Role> {
    const role = MakeRole(data)

    await this.prisma.role.create({
      data: PrismaRoleMapper.toPrisma(role),
    })

    return role
  }
}
