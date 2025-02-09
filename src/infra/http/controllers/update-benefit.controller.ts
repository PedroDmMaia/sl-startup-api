import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { UpdateBenefitUseCase } from '@/domain/sistem/application/use-case/update-benefit.usecase'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UpdateBenefitDTO } from '@/domain/sistem/application/DTO/update-benefit.dto'

const updateBenefitBodySchema = z.object({
  name: z.string(),
  value: z.number(),
  description: z.string().optional(),
  conditions: z.string().optional(),
})

type UpdateBenefitBodySchema = z.infer<typeof updateBenefitBodySchema>

const bodyValidationPipe = new ZodValidationPipe(updateBenefitBodySchema)

@ApiTags('update-benefit')
@ApiBearerAuth() 
@Controller('/benefit/:benefitId')
export class UpdateBenefit {
  constructor(private updateBenefitUseCase: UpdateBenefitUseCase) {}
  @Put('')
  @HttpCode(204)
  @ApiOperation({ summary: 'Atualizar os dados de um benefício' })
  @ApiBody({ type: UpdateBenefitDTO, description: 'Dados de um benefício' })
  @ApiResponse({ status: 200, description: 'Dados alterados com sucesso' })
  @ApiResponse({ status: 404, description: 'Dados inválidos' })
  async handle(
    @Body(bodyValidationPipe) body: UpdateBenefitBodySchema,
    @Param('benefitId') benefitId: string,
  ) {
    const { name, value, description, conditions } = body

    const result = await this.updateBenefitUseCase.execute({
      benefitId,
      name,
      value,
      description,
      conditions,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }
  }
}
