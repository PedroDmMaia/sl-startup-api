import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { DeleteBenefitUseCase } from '@/domain/sistem/application/use-case/delete-benefit.usecase'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Delete-benefit')
@ApiBearerAuth() 
@Controller('/benefits/delete/:id')
export class DeleteBenefit {
  constructor(private deleteBenefitUseCase: DeleteBenefitUseCase) {}
  @Delete()
  @HttpCode(200)
  @ApiOperation({ summary: 'Deletar benefício' })
  @ApiResponse({ status: 200, description: 'Benefício removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Dados Inválidos' })
  async handle(@Param('id') benefitId: string) {
    const result = await this.deleteBenefitUseCase.execute({
      benefitId,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }
  }
}
