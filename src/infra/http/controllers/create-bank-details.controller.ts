import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { CreateBankUseCase } from '@/domain/sistem/application/use-case/create-bank.usecase'

const createBankBodySchema = z.object({
  employeeId: z.string(),
  bankName: z.string(),
  agencyNumber: z.string(),
  accountNumber: z.string(),
})

type CreateBankBodySchema = z.infer<typeof createBankBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createBankBodySchema)

@Controller('/account')
export class CreateBankDetails {
  constructor(private CceateBankUseCase: CreateBankUseCase) {}
  @Post('/bank')
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateBankBodySchema) {
    const { employeeId, bankName, agencyNumber, accountNumber } = body

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
