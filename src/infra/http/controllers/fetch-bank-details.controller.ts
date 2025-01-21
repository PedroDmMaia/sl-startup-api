import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { FetchBankUseCase } from '@/domain/sistem/application/use-case/fetch-bank-details.usecase'
import { bankPresenter } from '../presenters/bank.presenter'

@Controller('/bank/list')
export class FetchBankDetails {
  constructor(private fetchBankUseCase: FetchBankUseCase) {}
  @Get('')
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
