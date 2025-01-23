import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { DeleteEmployeeUseCase } from '@/domain/sistem/application/use-case/delete-employee.usecase'

@Controller('/account/delete/:employeeId')
export class DeleteEmployee {
  constructor(private deleteEmployeeUseCase: DeleteEmployeeUseCase) {}
  @Delete('')
  @HttpCode(200)
  async handle(@Param('employeeId') employeeId: string) {
    const result = await this.deleteEmployeeUseCase.execute({
      id: employeeId,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }
  }
}
