import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { Public } from '@/infra/auth/public'
import { CreateEmployeeUseCase } from '@/domain/sistem/application/use-case/create-employee.usecase'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { createEmployeeDTO } from '@/domain/sistem/application/DTO/create-employee.dto'

const createUserBodySchema = z.object({
  name: z.string(),
  cpf: z.string().length(12),
  rg: z.string().length(9),
  email: z.string().email(),
  password: z.string(),
  phoneNumber: z.string().length(12),
})

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createUserBodySchema)

@ApiTags('Crete-employee')
@Controller('/accounts/create')
@Public()
export class EmployeeAccountController {
  constructor(private createEmployeeUseCase: CreateEmployeeUseCase) {}
  @Post('')
  @HttpCode(201)
  @ApiOperation({ summary: 'Criar um funcionário' })
  @ApiBody({ type: createEmployeeDTO, description: 'Dados para criar um funcionário' })
  @ApiResponse({ status: 200, description: 'Funcionário criado com sucesso' })
  @ApiResponse({ status: 404, description: 'Dados Inválidos' })
  async handle(@Body(bodyValidationPipe) body: CreateUserBodySchema) {
    const { name, cpf, rg, email, password, phoneNumber } = body

    const result = await this.createEmployeeUseCase.execute({
      name,
      cpf,
      rg,
      email,
      password,
      phoneNumber,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }
  }
}
