import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { Role } from '@/domain/sistem/enterprise/entities/role'
import {
  Benefit as PrismaBenefit,
  Prisma,
  Role as PrismaRole,
} from '@prisma/client'

export abstract class PrismaRoleMapper {
  static toDomain(raw: PrismaRole & { benefits?: PrismaBenefit[] }): Role {
    return Role.create(
      {
        name: raw.name,
        description: raw.description,
        pay: raw.pay,
        hourlyRate: raw.hourlyRate,
        employeeId: raw.employeeId,
        weeklyHours: raw.weeklyHours,
        benefitsIds:
          raw.benefits?.map((item) => new UniqueEntityid(item.id)) ?? [],
      },
      new UniqueEntityid(raw.id),
    )
  }

  static toPrisma(role: Role): Prisma.RoleUncheckedCreateInput {
    return {
      id: role.id.toString(),
      name: role.name,
      description: role.description,
      pay: role.pay,
      hourlyRate: role.hourlyRate,
      employeeId: role.employeeId,
      weeklyHours: role.weeklyHours,
      benefits: {
        connect: role.benefitsIds.map((item) => ({
          id: item.toString(),
        })),
      },
    }
  }
}
