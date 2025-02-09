import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { FetchBankUseCase } from '@/domain/sistem/application/use-case/fetch-bank-details.usecase'
import { bankPresenter } from '../presenters/bank.presenter'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Fetch-bank-details')
@ApiBearerAuth() 
@Controller('/bank/list/:employeeId')
export class FetchBankDetails {
  constructor(private fetchBankUseCase: FetchBankUseCase) {}
  @Get()
  @ApiOperation({ summary: 'Listar todos os dados bancário dos funcionários' })
  @ApiResponse({ status: 200, description: 'Dados listados' })
  async handle(@Param('employeeId') employeeId: string) {
    const result = await this.fetchBankUseCase.execute({
      employeeId,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }

    const { bank } = result.value

    return bankPresenter.toHttp(bank)
  }
}
