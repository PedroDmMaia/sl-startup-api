import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { Public } from '@/infra/auth/public'
import { CreateEmployeeUseCase } from '@/domain/sistem/application/use-case/create-employee.usecase'

const createUserBodySchema = z.object({
  name: z.string(),
  cpf: z.string().length(12),
  rg: z.string().length(9),
  email: z.string().email(),
  password: z.string(),
  phoneNumber: z.string().length(12),
})

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createUserBodySchema)

@Controller('/accounts/create')
@Public()
export class EmployeeAccountController {
  constructor(private createEmployeeUseCase: CreateEmployeeUseCase) {}
  @Post('')
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateUserBodySchema) {
    const { name, cpf, rg, email, password, phoneNumber } = body

    const result = await this.createEmployeeUseCase.execute({
      name,
      cpf,
      rg,
      email,
      password,
      phoneNumber,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }
  }
}
