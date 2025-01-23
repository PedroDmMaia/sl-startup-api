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

const updateBenefitBodySchema = z.object({
  name: z.string(),
  value: z.number(),
  description: z.string().optional(),
  conditions: z.string().optional(),
})

type UpdateBenefitBodySchema = z.infer<typeof updateBenefitBodySchema>

const bodyValidationPipe = new ZodValidationPipe(updateBenefitBodySchema)

@Controller('/benefit/:benefitId')
export class UpdateBenefit {
  constructor(private updateBenefitUseCase: UpdateBenefitUseCase) {}
  @Put('')
  @HttpCode(204)
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
