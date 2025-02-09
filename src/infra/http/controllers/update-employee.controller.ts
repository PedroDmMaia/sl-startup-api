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
import { UpdateEmployeeUseCase } from '@/domain/sistem/application/use-case/update-employee.usecase'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UpdateEmployeeDTO } from '@/domain/sistem/application/DTO/update-employee.dto'

const updateUserBodySchema = z.object({
  name: z.string(),
  cpf: z.string().min(12).max(12),
  rg: z.string().min(9).max(9),
  email: z.string().email(),
  password: z.string().optional(),
  phoneNumber: z.string().min(12).max(12),
  isActive: z.boolean(),
})

type UpdateUserBodySchema = z.infer<typeof updateUserBodySchema>

const bodyValidationPipe = new ZodValidationPipe(updateUserBodySchema)

@ApiTags('update-employee')
@ApiBearerAuth() 
@Controller('/employee/:employeeId')
export class UpdateEmployee {
  constructor(private updateEmployeeUseCase: UpdateEmployeeUseCase) {}
  @Put('')
  @HttpCode(204)
  @ApiOperation({ summary: 'Atualizar os dados de um funcionário' })
  @ApiBody({ type: UpdateEmployeeDTO, description: 'Dados do funcionário' })
  @ApiResponse({ status: 200, description: 'Dados alterados com sucesso' })
  @ApiResponse({ status: 404, description: 'Dados inválidos' })
  async handle(
    @Body(bodyValidationPipe) body: UpdateUserBodySchema,
    @Param('employeeId') employeeId: string,
  ) {
    const { name, cpf, rg, email, password, phoneNumber, isActive } = body

    const result = await this.updateEmployeeUseCase.execute({
      employeeId,
      name,
      cpf,
      rg,
      email,
      password,
      phoneNumber,
      isActive,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }
  }
}
