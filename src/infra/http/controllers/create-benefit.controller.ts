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
import { CreateBenefitUseCase } from '@/domain/sistem/application/use-case/create-benefit.usecase'

const createBenefitBodySchema = z.object({
  name: z.string(),
  value: z.number(),
  description: z.string().optional(),
  conditions: z.string().optional(),
})

type CreateBenefitBodySchema = z.infer<typeof createBenefitBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createBenefitBodySchema)

@Controller('/benefit/:employeeId')
export class BenefitController {
  constructor(private createBenefitUseCase: CreateBenefitUseCase) {}
  @Post('')
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateBenefitBodySchema,
    @Param('roleId') roleId: string[],
  ) {
    const { name, value, description, conditions } = body

    const result = await this.createBenefitUseCase.execute({
      roleId,
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
