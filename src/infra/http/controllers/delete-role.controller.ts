import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from '@nestjs/common'
import { DeleteRoleUseCase } from '@/domain/sistem/application/use-case/delete-role.usecase'

@Controller('/role/delete/:id')
export class DeleteRole {
  constructor(private deleteRoleUseCase: DeleteRoleUseCase) {}
  @Delete('')
  @HttpCode(200)
  async handle(@Param('id') roleId: string) {
    const result = await this.deleteRoleUseCase.execute({
      roleId,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }
  }
}
