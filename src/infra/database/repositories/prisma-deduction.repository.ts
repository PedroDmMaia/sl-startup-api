import { PaginationParams } from '@/core/types/pagination-params'
import { DeductionRepository } from '@/domain/sistem/application/repositories/deductions.repository'
import { Deductions } from '@/domain/sistem/enterprise/entities/deduction'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { PrismaDeductionMapper } from '../mappers/prisma-deduction.mapper'

@Injectable()
export class PrismaDeductionRepository implements DeductionRepository {
  constructor(private prisma: PrismaService) {}

  async create(deductions: Deductions): Promise<void> {
    const data = PrismaDeductionMapper.toPrisma(deductions)

    await this.prisma.deduction.create({
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.deduction.delete({
      where: {
        id,
      },
    })
  }

  async findById(id: string): Promise<Deductions | null> {
    const deduction = await this.prisma.deduction.findUnique({
      where: {
        id,
      },
    })

    if (!deduction) return null

    return PrismaDeductionMapper.toDomain(deduction)
  }

  async findManyByEmployeeId(
    employeeId: string,
    { page }: PaginationParams,
  ): Promise<Deductions[] | null> {
    const deductions = await this.prisma.deduction.findMany({
      where: {
        employeeId,
      },
      take: 20,
      skip: (page - 1) * 20,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return deductions.map((item) => PrismaDeductionMapper.toDomain(item))
  }
}
