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

const updateBankBodySchema = z.object({
  bankName: z.string(),
  agencyNumber: z.string(),
  accountNumber: z.string(),
})

type UpdateBankBodySchema = z.infer<typeof updateBankBodySchema>

const bodyValidationPipe = new ZodValidationPipe(updateBankBodySchema)

@Controller('/bank/:employeeId')
export class UpdateBank {
  constructor(private updateBankUseCase: UpdateBankUseCase) {}
  @Put('')
  @HttpCode(204)
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
