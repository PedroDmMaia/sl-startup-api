import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { FetchEmployeeUseCase } from '@/domain/sistem/application/use-case/fetch-employee.usecase'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { employeePresenter } from '../presenters/employee.presenter'
import { FetchRoleUseCase } from '@/domain/sistem/application/use-case/fetch-role.usecase'
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'

const pageQueryParamsSchema = z.object({
  name: z.string().optional(),
  page: z.coerce.number().min(1).optional().default(1),
})

type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

const queryValdiationPipe = new ZodValidationPipe(pageQueryParamsSchema)

@ApiTags('Fetch-employees')
@ApiBearerAuth() 
@Controller('/employee/list')
export class FetchEmployee {
  constructor(
    private fetchEmployeeUseCase: FetchEmployeeUseCase,
    private fetchRoleUseCase: FetchRoleUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os funcionários' })
  @ApiResponse({ status: 200, description: 'funcionários listados' })
  @ApiQuery({ name: 'name', required: false, type: String, description: 'Nome do funcionário para filtrar' })
  @ApiQuery({ name: 'page', required: true, type: Number, description: 'Número da página (padrão: 1)' })
  async handle(@Query(queryValdiationPipe) query: PageQueryParamsSchema) {
    const { page, name } = query

    const result = await this.fetchEmployeeUseCase.execute({
      page,
      name,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }

    const { employee } = result.value

    const resulRole = await this.fetchRoleUseCase.execute({
      page,
      name,
    })

    if (resulRole.isLeft()) {
      return new BadRequestException()
    }

    const { role } = resulRole.value

    const employeesWithRoles = employee.map((emp) => {
      const employeeRole = role.find((r) => r.employeeId === emp.id.toString())
      return {
        ...employeePresenter.toHttp(emp),
        role: employeeRole?.name ?? 'não atrelado',
      }
    })

    return { employees: employeesWithRoles }
  }
}
