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
import { UpdateRoleUseCase } from '@/domain/sistem/application/use-case/update-role.usecase'

const updateRoleBodySchema = z.object({
  name: z.string(),
  pay: z.number(),
  description: z.string(),
  hourlyRate: z.number(),
  weeklyHours: z.number(),
  benefitsIds: z.array(z.string()),
})

type UpdateRoleBodySchema = z.infer<typeof updateRoleBodySchema>

const bodyValidationPipe = new ZodValidationPipe(updateRoleBodySchema)

@Controller('/role/:roleId/:employeeId')
export class UpdateRole {
  constructor(private CceateRoleUseCase: UpdateRoleUseCase) {}
  @Put('')
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: UpdateRoleBodySchema,
    @Param('employeeId') employeeId: string,
    @Param('roleId') roleId: string,
  ) {
    const { name, pay, description, hourlyRate, weeklyHours, benefitsIds } =
      body

    const result = await this.CceateRoleUseCase.execute({
      roleId,
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
