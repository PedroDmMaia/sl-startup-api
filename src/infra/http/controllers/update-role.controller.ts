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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UpdateRoleDTO } from '@/domain/sistem/application/DTO/update-role.dto'

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


@ApiTags('update-role')
@ApiBearerAuth() 
@Controller('/role/:roleId/:employeeId')
export class UpdateRole {
  constructor(private CceateRoleUseCase: UpdateRoleUseCase) {}
  @Put('')
  @HttpCode(204)
  @ApiOperation({ summary: 'Atualizar os dados de um cargo' })
  @ApiBody({ type: UpdateRoleDTO, description: 'Dados do cargo' })
  @ApiResponse({ status: 200, description: 'Dados alterados com sucesso' })
  @ApiResponse({ status: 404, description: 'Dados inválidos' })
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
