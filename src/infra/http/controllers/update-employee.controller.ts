import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { UpdateEmployeeUseCase } from '@/domain/sistem/application/use-case/update-employee.usecase'

const updateUserBodySchema = z.object({
  name: z.string(),
  cpf: z.string().min(12).max(12),
  rg: z.string().min(9).max(9),
  email: z.string().email(),
  password: z.string(),
  phoneNumber: z.string().min(12).max(12),
  isActive: z.boolean(),
})

type UpdateUserBodySchema = z.infer<typeof updateUserBodySchema>

const bodyValidationPipe = new ZodValidationPipe(updateUserBodySchema)

@Controller('/employee/:id')
export class UpdateEmployee {
  constructor(private updateEmployeeUseCase: UpdateEmployeeUseCase) {}
  @Put('')
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: UpdateUserBodySchema,
    @Param('id') employeeId: string,
  ) {
    const { name, cpf, rg, email, password, phoneNumber, isActive } = body

    const result = await this.updateEmployeeUseCase.execute({
      employeeId,
      name,
      cpf,
      rg,
      email,
      password,
      phoneNumber,
      isActive,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }
  }
}
