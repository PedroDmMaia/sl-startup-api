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
import { CreateBankUseCase } from '@/domain/sistem/application/use-case/create-bank.usecase'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { createBankDetailsDTO } from '@/domain/sistem/application/DTO/create-bank.dto'

const createBankBodySchema = z.object({
  bankName: z.string(),
  agencyNumber: z.string(),
  accountNumber: z.string(),
})

type CreateBankBodySchema = z.infer<typeof createBankBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createBankBodySchema)

@ApiTags('Crete-bank-details')
@Controller('/employees/:employeeId/bank-details')
export class CreateBankDetails {
  constructor(private CceateBankUseCase: CreateBankUseCase) {}
  @Post('')
  @HttpCode(201)
  @ApiOperation({ summary: 'Criar dados bancarios para um funcionário' })
  @ApiBody({ type: createBankDetailsDTO, description: 'Dados do usuário' })
  @ApiResponse({ status: 200, description: 'Dados criados com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async handle(
    @Body(bodyValidationPipe) body: CreateBankBodySchema,
    @Param('employeeId') employeeId: string,
  ) {
    const { bankName, agencyNumber, accountNumber } = body

    const result = await this.CceateBankUseCase.execute({
      employeeId,
      bankName,
      agencyNumber,
      accountNumber,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }
  }
}
