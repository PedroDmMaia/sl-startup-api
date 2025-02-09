import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { DeleteDeductionUseCase } from '@/domain/sistem/application/use-case/delete-deduction.usecase'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Delete-deduction')
@ApiBearerAuth() 
@Controller('/deduction/delete/:deductionId')
export class DeleteDeduction {
  constructor(private deleteDeductionUseCase: DeleteDeductionUseCase) {}
  @Delete('')
  @HttpCode(200)
  @ApiOperation({ summary: 'Deletar deducão' })
  @ApiResponse({ status: 200, description: 'Deducão removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Dados Inválidos' })
  async handle(@Param('deductionId') deductionId: string) {
    const result = await this.deleteDeductionUseCase.execute({
      deductionId,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }
  }
}
