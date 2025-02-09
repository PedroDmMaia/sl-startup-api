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
import { UpdateBankUseCase } from '@/domain/sistem/application/use-case/update-bank.usecase'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UpdateBankDetailsDTO } from '@/domain/sistem/application/DTO/update-bank.dto'

const updateBankBodySchema = z.object({
  bankName: z.string(),
  agencyNumber: z.string(),
  accountNumber: z.string(),
})

type UpdateBankBodySchema = z.infer<typeof updateBankBodySchema>

const bodyValidationPipe = new ZodValidationPipe(updateBankBodySchema)

@ApiTags('update-bank-details')
@ApiBearerAuth() 
@Controller('/bank/:employeeId')
export class UpdateBank {
  constructor(private updateBankUseCase: UpdateBankUseCase) {}
  @Put('')
  @HttpCode(204)
  @ApiOperation({ summary: 'Atualizar os dados bancarios de um funcionário' })
  @ApiBody({ type: UpdateBankDetailsDTO, description: 'Dados bancarios do funcionário' })
  @ApiResponse({ status: 200, description: 'Dados alterados com sucesso' })
  @ApiResponse({ status: 404, description: 'Dados inválidos' })
  async handle(
    @Body(bodyValidationPipe) body: UpdateBankBodySchema,
    @Param('employeeId') employeeId: string,
  ) {
    const { bankName, agencyNumber, accountNumber } = body

    const result = await this.updateBankUseCase.execute({
      employeeId,
      bankName,
      accountNumber,
      agencyNumber,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }
  }
}
