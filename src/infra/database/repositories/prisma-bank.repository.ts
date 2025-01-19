import { BankRepository } from '@/domain/sistem/application/repositories/bank.repository'
import { Bank } from '@/domain/sistem/enterprise/entities/bank'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { PrismaBankMapper } from '../mappers/prisma-bank.mapper'

@Injectable()
export class PrismaBankRepository implements BankRepository {
  constructor(private prisma: PrismaService) {}

  async create(bank: Bank): Promise<void> {
    const data = PrismaBankMapper.toPrisma(bank)

    await this.prisma.bank.create({
      data,
    })
  }

  async update(bank: Bank): Promise<void> {
    const data = PrismaBankMapper.toPrisma(bank)
    await this.prisma.bank.update({
      where: {
        id: bank.id.toString(),
      },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.bank.delete({
      where: {
        id,
      },
    })
  }

  async findById(id: string): Promise<Bank | null> {
    const bank = await this.prisma.bank.findUnique({
      where: {
        id,
      },
    })

    if (!bank) return null

    return PrismaBankMapper.toDomain(bank)
  }

  async findByEmployeeId(id: string): Promise<Bank | null> {
    const bank = await this.prisma.bank.findFirst({
      where: {
        employeeId: id,
      },
    })

    if (!bank) return null

    return PrismaBankMapper.toDomain(bank)
  }
}
