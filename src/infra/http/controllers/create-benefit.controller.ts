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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { createBenefitDTO } from '@/domain/sistem/application/DTO/create-benefit.dto'

const createBenefitBodySchema = z.object({
  roleId: z.array(z.string()),
  name: z.string(),
  value: z.number(),
  description: z.string().optional(),
  conditions: z.string().optional(),
})

type CreateBenefitBodySchema = z.infer<typeof createBenefitBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createBenefitBodySchema)

@ApiTags('Crete-benefit')
@Controller('/benefit')
export class BenefitController {
  constructor(private createBenefitUseCase: CreateBenefitUseCase) {}
  @Post('')
  @HttpCode(201)
  @ApiOperation({ summary: 'Criar dados bancarios para um funcionário' })
  @ApiBody({ type: createBenefitDTO, description: 'Dados do usuário' })
  @ApiResponse({ status: 200, description: 'Dados criados com sucesso' })
  @ApiResponse({ status: 404, description: 'Role não encontrado' })
  async handle(
    @Body(bodyValidationPipe) body: CreateBenefitBodySchema,
  ) {
    const { name, value, description, conditions, roleId } = body


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
