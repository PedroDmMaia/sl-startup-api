import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { CreateRoleUseCase } from '@/domain/sistem/application/use-case/create-role.usecase'

const createRoleBodySchema = z.object({
  employeeId: z.string(),
  name: z.string(),
  pay: z.number(),
  description: z.string(),
  hourlyRate: z.number(),
  weeklyHours: z.number(),
  benefitsIds: z.array(z.string()),
})

type CreateRoleBodySchema = z.infer<typeof createRoleBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createRoleBodySchema)

@Controller('/role')
export class CreateRole {
  constructor(private CceateRoleUseCase: CreateRoleUseCase) {}
  @Post('/create')
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateRoleBodySchema) {
    const {
      employeeId,
      name,
      pay,
      description,
      hourlyRate,
      weeklyHours,
      benefitsIds,
    } = body

    const result = await this.CceateRoleUseCase.execute({
      employeeId,
      name,
      pay,
      description,
      hourlyRate,
      weeklyHours,
      benefitsIds,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }
  }
}
