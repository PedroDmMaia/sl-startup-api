import { PaginationParams } from '@/core/types/pagination-params'
import { BenefitRepository } from '@/domain/sistem/application/repositories/benefit.repository'
import { Benefit } from '@/domain/sistem/enterprise/entities/benefit'
import { Injectable } from '@nestjs/common'
import { PrismaBenefitMapper } from '../mappers/prisma-benefit.mapper'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class PrismaBenefitRepository implements BenefitRepository {
  constructor(private prisma: PrismaService) {}

  async create(benefit: Benefit): Promise<void> {
    const data = PrismaBenefitMapper.toPrisma(benefit)

    await this.prisma.benefit.create({
      data,
    })
  }

  async update(benefit: Benefit): Promise<void> {
    const data = PrismaBenefitMapper.toPrisma(benefit)

    await this.prisma.benefit.update({
      where: {
        id: data.id,
      },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.benefit.delete({
      where: {
        id,
      },
    })
  }

  async findById(id: string): Promise<Benefit | null> {
    const benefit = await this.prisma.benefit.findUnique({
      where: {
        id,
      },
    })

    if (!benefit) return null

    return PrismaBenefitMapper.toDomain(benefit)
  }

  async listAll({ page }: PaginationParams): Promise<Benefit[]> {
    const benefits = await this.prisma.benefit.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return benefits.map(PrismaBenefitMapper.toDomain)
  }
}
