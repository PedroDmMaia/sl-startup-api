import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { Benefit } from '@/domain/sistem/enterprise/entities/benefit'
import {
  Prisma,
  Role as PrismaRole,
  Benefit as PrismaBenefit,
} from '@prisma/client'

export abstract class PrismaBenefitMapper {
  static toDomain(raw: PrismaBenefit & { roleIds?: PrismaRole[] }): Benefit {
    return Benefit.create(
      {
        name: raw.name,
        value: raw.value,
        description: raw.description ?? '',
        conditions: raw.conditions ?? '',
        roleId: raw.roleIds?.map((item) => new UniqueEntityid(item.id)),
      },
      new UniqueEntityid(raw.id),
    )
  }

  static toPrisma(benefit: Benefit): Prisma.BenefitUncheckedCreateInput {
    return {
      id: benefit.id.toString(),
      name: benefit.name,
      value: benefit.value,
      description: benefit.description ?? '',
      conditions: benefit.conditions ?? '',
      roles: {
        connect: benefit.roleId.map((item) => ({
          id: item.toString(),
        })),
      },
    }
  }
}
