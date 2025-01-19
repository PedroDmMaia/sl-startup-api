import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { BankRepository } from '@/domain/sistem/application/repositories/bank.repository'
import { PrismaBankRepository } from './repositories/prisma-bank.repository'
import { BenefitRepository } from '@/domain/sistem/application/repositories/benefit.repository'
import { PrismaBenefitRepository } from './repositories/prisma-benefit.repository'
import { DeductionRepository } from '@/domain/sistem/application/repositories/deductions.repository'
import { PrismaDeductionRepository } from './repositories/prisma-deduction.repository'
import { EmployeeRepository } from '@/domain/sistem/application/repositories/employee.repository'
import { PrismaEmployeeRepository } from './repositories/prisma-employee.repository'
import { RoleRepository } from '@/domain/sistem/application/repositories/role.repository'
import { PrismaRoleRepository } from './repositories/prisma-role.repository'

@Module({
  providers: [
    PrismaService,
    { provide: BankRepository, useClass: PrismaBankRepository },
    { provide: BenefitRepository, useClass: PrismaBenefitRepository },
    { provide: DeductionRepository, useClass: PrismaDeductionRepository },
    { provide: EmployeeRepository, useClass: PrismaEmployeeRepository },
    { provide: RoleRepository, useClass: PrismaRoleRepository },
  ],
  exports: [
    PrismaService,
    BankRepository,
    BenefitRepository,
    DeductionRepository,
    EmployeeRepository,
    RoleRepository,
  ],
})
export class DatabaseModule {}
