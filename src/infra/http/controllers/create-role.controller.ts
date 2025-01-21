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
import { CreateRoleUseCase } from '@/domain/sistem/application/use-case/create-role.usecase'

const createRoleBodySchema = z.object({
  name: z.string(),
  pay: z.number(),
  description: z.string(),
  hourlyRate: z.number(),
  weeklyHours: z.number(),
  benefitsIds: z.array(z.string()),
})

type CreateRoleBodySchema = z.infer<typeof createRoleBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createRoleBodySchema)

@Controller('/roles/:employeeId')
export class CreateRole {
  constructor(private CceateRoleUseCase: CreateRoleUseCase) {}
  @Post('')
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateRoleBodySchema,
    @Param('employeeId') employeeId: string,
  ) {
    const { name, pay, description, hourlyRate, weeklyHours, benefitsIds } =
      body

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
