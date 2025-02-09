import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { DeleteRoleUseCase } from '@/domain/sistem/application/use-case/delete-role.usecase'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Delete-role')
@ApiBearerAuth() 
@Controller('/role/delete/:roleId')
export class DeleteRole {
  constructor(private deleteRoleUseCase: DeleteRoleUseCase) {}
  @Delete('')
  @HttpCode(200)
  @ApiOperation({ summary: 'Deletar cargo' })
  @ApiResponse({ status: 200, description: 'Cargo removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Dados Inválidos' })
  async handle(@Param('roleId') roleId: string) {
    const result = await this.deleteRoleUseCase.execute({
      roleId,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }
  }
}
