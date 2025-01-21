import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { DeleteBenefitUseCase } from '@/domain/sistem/application/use-case/delete-benefit.usecase'

@Controller('/benefits/delete/:id')
export class DeleteBenefit {
  constructor(private deleteBenefitUseCase: DeleteBenefitUseCase) {}
  @Delete('')
  @HttpCode(200)
  async handle(@Param('id') benefitId: string) {
    const result = await this.deleteBenefitUseCase.execute({
      benefitId,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }
  }
}
