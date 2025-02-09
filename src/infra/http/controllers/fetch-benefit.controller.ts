import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { FetchBenefitUseCase } from '@/domain/sistem/application/use-case/fetch-benefit.usecase'
import { benefitPresenter } from '../presenters/benefit.presenter'
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'

const pageQueryParamsSchema = z.object({
  name: z.string().optional(),
  page: z.coerce.number().min(1).optional().default(1),
})

type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

const queryValdiationPipe = new ZodValidationPipe(pageQueryParamsSchema)

@ApiTags('Fetch-benefit')
@ApiBearerAuth() 
@Controller('/benefit/list')
export class FetchBenefit {
  constructor(private fetchBenefitUseCase: FetchBenefitUseCase) {}
  @Get()
  @ApiOperation({ summary: 'Listar todos os beneficios' })
  @ApiResponse({ status: 200, description: 'Dados listados' })
  @ApiQuery({ name: 'name', required: false, type: String, description: 'Nome do benefício para filtrar' })
  @ApiQuery({ name: 'page', required: true, type: Number, description: 'Número da página (padrão: 1)' })
  async handle(@Query(queryValdiationPipe) query: PageQueryParamsSchema) {
    const { page, name } = query

    const result = await this.fetchBenefitUseCase.execute({
      page,
      name,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }

    const { benefit } = result.value

    return { benefits: benefit.map((item) => benefitPresenter.toHttp(item)) }
  }
}
