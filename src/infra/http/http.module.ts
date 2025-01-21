import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/databse.module'
import { AuthenticateUserUseCase } from '@/domain/sistem/application/use-case/authenticate-user.usecase'
import { CreateBankUseCase } from '@/domain/sistem/application/use-case/create-bank.usecase'
import { CreateBenefitUseCase } from '@/domain/sistem/application/use-case/create-benefit.usecase'
import { CreateDeductionUseCase } from '@/domain/sistem/application/use-case/create-deductions.usecase'
import { CreateEmployeeUseCase } from '@/domain/sistem/application/use-case/create-employee.usecase'
import { CreateRoleUseCase } from '@/domain/sistem/application/use-case/create-role.usecase'
import { DeleteBenefitUseCase } from '@/domain/sistem/application/use-case/delete-benefit.usecase'
import { DeleteDeductionUseCase } from '@/domain/sistem/application/use-case/delete-deduction.usecase'
import { DeleteEmployeeUseCase } from '@/domain/sistem/application/use-case/delete-employee.usecase'
import { DeleteRoleUseCase } from '@/domain/sistem/application/use-case/delete-role.usecase'
import { FetchBenefitUseCase } from '@/domain/sistem/application/use-case/fetch-benefit.usecase'
import { FetchDeductionUseCase } from '@/domain/sistem/application/use-case/fetch-deduction-by-employeeId.usecase'
import { FetchEmployeeUseCase } from '@/domain/sistem/application/use-case/fetch-employee.usecase'
import { FetchRoleUseCase } from '@/domain/sistem/application/use-case/fetch-role.usecase'
import { UpdateBankUseCase } from '@/domain/sistem/application/use-case/update-bank.usecase'
import { UpdateBenefitUseCase } from '@/domain/sistem/application/use-case/update-benefit.usecase'
import { UpdateEmployeeUseCase } from '@/domain/sistem/application/use-case/update-employee.usecase'
import { UpdateRoleUseCase } from '@/domain/sistem/application/use-case/update-role.usecase'
import { cryptographyModule } from '../cryptography/cryptography.module'
import { EmployeeAccountController } from './controllers/create-employee.controller'
import { CreateRole } from './controllers/create-role.controller'
import { AuthenticateUser } from './controllers/authenticate-user.controller'
import { BenefitController } from './controllers/create-benefit.controller'
import { DeductionController } from './controllers/create-deduction.controller'
import { CreateBankDetails } from './controllers/create-bank-details.controller'
import { UpdateEmployee } from './controllers/update-employee.controller'
import { UpdateBenefit } from './controllers/update-benefit.controller'
import { UpdateBank } from './controllers/update-bank.controller'
import { UpdateRole } from './controllers/update-role.controller'
import { DeleteEmployee } from './controllers/delete-employee.controller'
import { DeleteRole } from './controllers/delete-role.controller'
import { DeleteBenefit } from './controllers/delete-benefit.controller'
import { DeleteDeduction } from './controllers/delete-deduction.controller'
import { FetchEmployee } from './controllers/fetch-employee.contoller'
import { FetchBenefit } from './controllers/fetch-benefit.controller'
import { FetchRole } from './controllers/fetch-role.controller'
import { FetchDeductionByEmployeeId } from './controllers/fetch-deduction-by-employeeId.controller'
import { FetchBankUseCase } from '@/domain/sistem/application/use-case/fetch-bank-details.usecase'
import { FetchBankDetails } from './controllers/fetch-bank-details.controller'

@Module({
  imports: [DatabaseModule, cryptographyModule],
  controllers: [
    EmployeeAccountController,
    CreateRole,
    AuthenticateUser,
    BenefitController,
    DeductionController,
    CreateBankDetails,
    UpdateEmployee,
    UpdateBenefit,
    UpdateBank,
    UpdateRole,
    DeleteEmployee,
    DeleteRole,
    DeleteBenefit,
    DeleteDeduction,
    FetchEmployee,
    FetchBenefit,
    FetchRole,
    FetchDeductionByEmployeeId,
    FetchBankDetails,
  ],
  providers: [
    AuthenticateUserUseCase,
    CreateBankUseCase,
    CreateBenefitUseCase,
    CreateDeductionUseCase,
    CreateEmployeeUseCase,
    CreateRoleUseCase,
    DeleteBenefitUseCase,
    DeleteDeductionUseCase,
    DeleteEmployeeUseCase,
    DeleteRoleUseCase,
    FetchBenefitUseCase,
    FetchDeductionUseCase,
    FetchEmployeeUseCase,
    FetchRoleUseCase,
    UpdateBankUseCase,
    UpdateBenefitUseCase,
    UpdateEmployeeUseCase,
    UpdateRoleUseCase,
    FetchBankUseCase,
  ],
})
export class HttpModule {}
