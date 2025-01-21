import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { CreateDeductionUseCase } from '@/domain/sistem/application/use-case/create-deductions.usecase'

const createBenefitBodySchema = z.object({
  reason: z.string(),
  date: z.string().date(),
  amount: z.number(),
  description: z.string(),
})

type CreateBenefitBodySchema = z.infer<typeof createBenefitBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createBenefitBodySchema)

@Controller('/deduction/:employeeId')
export class DeductionController {
  constructor(private createDeductionUseCase: CreateDeductionUseCase) {}
  @Post('')
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateBenefitBodySchema,
    @Param('employeeId') employeeId: string,
  ) {
    const { reason, date, amount, description } = body

    const result = await this.createDeductionUseCase.execute({
      employeeId,
      reason,
      date: new Date(date),
      amount,
      description,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }
  }
}
