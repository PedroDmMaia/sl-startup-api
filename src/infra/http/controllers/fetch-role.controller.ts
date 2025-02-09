import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { FetchRoleUseCase } from '@/domain/sistem/application/use-case/fetch-role.usecase'
import { rolePresenter } from '../presenters/role.presenter'
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'

const pageQueryParamsSchema = z.object({
  name: z.string().optional(),
  page: z.coerce.number().min(1).optional().default(1),
})

type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

const queryValdiationPipe = new ZodValidationPipe(pageQueryParamsSchema)

@ApiTags('Fetch-roles')
@ApiBearerAuth() 
@Controller('/employee/role/list')
export class FetchRole {
  constructor(private fetchRoleUseCase: FetchRoleUseCase) {}
  @Get()
  @ApiOperation({ summary: 'Listar todos os cargos' })
  @ApiResponse({ status: 200, description: 'Cargos listados' })
  @ApiQuery({ name: 'name', required: false, type: String, description: 'Nome do cargo para filtrar' })
  @ApiQuery({ name: 'page', required: true, type: Number, description: 'Número da página (padrão: 1)' })
  async handle(@Query(queryValdiationPipe) query: PageQueryParamsSchema) {
    const { page, name } = query

    const result = await this.fetchRoleUseCase.execute({
      page,
      name,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }

    const { role } = result.value

    return { roles: role.map((item) => rolePresenter.toHttp(item)) }
  }
}
