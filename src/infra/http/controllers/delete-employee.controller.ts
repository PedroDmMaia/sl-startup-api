import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { Public } from '@/infra/auth/public'
import { DeleteEmployeeUseCase } from '@/domain/sistem/application/use-case/delete-employee.usecase'

@Controller('/account/delete/:id')
@Public()
export class DeleteEmployee {
  constructor(private deleteEmployeeUseCase: DeleteEmployeeUseCase) {}
  @Delete('')
  @HttpCode(200)
  async handle(@Param('id') id: string) {
    const result = await this.deleteEmployeeUseCase.execute({
      id,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }
  }
}
