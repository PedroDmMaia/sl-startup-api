import { PaginationParams } from '@/core/types/pagination-params'
import { RoleRepository } from '@/domain/sistem/application/repositories/role.repository'
import { Role } from '@/domain/sistem/enterprise/entities/role'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { PrismaRoleMapper } from '../mappers/prisma-role.mapper'

@Injectable()
export class PrismaRoleRepository implements RoleRepository {
  constructor(private prisma: PrismaService) {}

  async create(role: Role): Promise<void> {
    const data = PrismaRoleMapper.toPrisma(role)
    await this.prisma.role.create({
      data,
    })
  }

  async update(role: Role): Promise<void> {
    const data = PrismaRoleMapper.toPrisma(role)
    await this.prisma.role.update({
      where: {
        id: role.id.toString(),
      },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.role.delete({
      where: {
        id,
      },
    })
  }

  async findById(id: string): Promise<Role | null> {
    const role = await this.prisma.role.findUnique({
      where: {
        id,
      },
    })

    if (!role) return null

    return PrismaRoleMapper.toDomain(role)
  }

  async findByEmployeeId(employeeId: string): Promise<Role | null> {
    const roleByEmployeeId = await this.prisma.role.findFirst({
      where: { employeeId },
    })

    if (!roleByEmployeeId) return null

    return PrismaRoleMapper.toDomain(roleByEmployeeId)
  }

  async listAll({ page }: PaginationParams): Promise<Role[]> {
    const benefits = await this.prisma.role.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return benefits.map(PrismaRoleMapper.toDomain)
  }
}
