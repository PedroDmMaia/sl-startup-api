import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { DeleteEmployeeUseCase } from '@/domain/sistem/application/use-case/delete-employee.usecase'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Delete-employee')
@ApiBearerAuth() 
@Controller('/account/delete/:employeeId')
export class DeleteEmployee {
  constructor(private deleteEmployeeUseCase: DeleteEmployeeUseCase) {}
  @Delete('')
  @HttpCode(200)
  @ApiOperation({ summary: 'Deletar funcionário' })
  @ApiResponse({ status: 200, description: 'Funcionário removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Dados Inválidos' })
  async handle(@Param('employeeId') employeeId: string) {
    const result = await this.deleteEmployeeUseCase.execute({
      id: employeeId,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }
  }
}
