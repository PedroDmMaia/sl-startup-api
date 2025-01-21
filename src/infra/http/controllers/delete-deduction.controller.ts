import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { DeleteDeductionUseCase } from '@/domain/sistem/application/use-case/delete-deduction.usecase'

@Controller('/deduction/delete/:id')
export class DeleteDeduction {
  constructor(private deleteDeductionUseCase: DeleteDeductionUseCase) {}
  @Delete('')
  @HttpCode(200)
  async handle(@Param('id') deductionId: string) {
    const result = await this.deleteDeductionUseCase.execute({
      deductionId,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }
  }
}
