import { PaginationParams } from '@/core/types/pagination-params'
import { EmployeeRepository } from '@/domain/sistem/application/repositories/employee.repository'
import { Employee } from '@/domain/sistem/enterprise/entities/employee'
import { Injectable } from '@nestjs/common'
import { PrismaEmployeeMapper } from '../mappers/prisma-employee.mapper'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class PrismaEmployeeRepository implements EmployeeRepository {
  constructor(private prisma: PrismaService) {}

  async create(employee: Employee): Promise<void> {
    const data = PrismaEmployeeMapper.toPrisma(employee)

    await this.prisma.employee.create({
      data,
    })
  }

  async update(employee: Employee): Promise<void> {
    const data = PrismaEmployeeMapper.toPrisma(employee)

    await this.prisma.employee.update({
      where: {
        id: employee.id.toString(),
      },
      data,
    })
  }

  async delete(employee: Employee): Promise<void> {
    await this.prisma.employee.delete({
      where: {
        id: employee.id.toString(),
      },
    })
  }

  async findById(id: string): Promise<Employee | null> {
    const employee = await this.prisma.employee.findUnique({
      where: {
        id,
      },
    })
    if (!employee) {
      return null
    }

    return PrismaEmployeeMapper.toDomain(employee)
  }

  async findByCpf(cpf: string): Promise<Employee | null> {
    const employee = await this.prisma.employee.findFirst({
      where: {
        cpf,
      },
    })

    if (!employee) {
      return null
    }

    return PrismaEmployeeMapper.toDomain(employee)
  }

  async findByRg(rg: string): Promise<Employee | null> {
    const employee = await this.prisma.employee.findFirst({
      where: {
        rg,
      },
    })

    if (!employee) {
      return null
    }

    return PrismaEmployeeMapper.toDomain(employee)
  }

  async findByEmail(email: string): Promise<Employee | null> {
    const employee = await this.prisma.employee.findFirst({
      where: {
        email,
      },
    })

    if (!employee) {
      return null
    }

    return PrismaEmployeeMapper.toDomain(employee)
  }

  async listAll({ page }: PaginationParams): Promise<Employee[]> {
    const employess = await this.prisma.employee.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return employess.map((item) => PrismaEmployeeMapper.toDomain(item))
  }
}
