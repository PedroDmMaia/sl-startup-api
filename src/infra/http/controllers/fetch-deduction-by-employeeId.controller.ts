import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { FetchDeductionUseCase } from '@/domain/sistem/application/use-case/fetch-deduction-by-employeeId.usecase'
import { deductionPresenter } from '../presenters/deduction.presenter'

const pageQueryParamsSchema = z.coerce.number().min(1).optional().default(1)

type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

const queryValdiationPipe = new ZodValidationPipe(pageQueryParamsSchema)

@Controller('/employee/:employeeId/deduction')
export class FetchDeductionByEmployeeId {
  constructor(private fetchDeductionUseCase: FetchDeductionUseCase) {}
  @Get('')
  async handle(
    @Param('employeeId') employeeId: string,
    @Query('page', queryValdiationPipe) page: PageQueryParamsSchema,
  ) {
    const result = await this.fetchDeductionUseCase.execute({
      employeeId,
      page,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }

    const { deductions } = result.value

    return {
      deductions: deductions.map((item) => deductionPresenter.toHttp(item)),
    }
  }
}
