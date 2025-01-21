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
import { AuthenticateUserUseCase } from '@/domain/sistem/application/use-case/authenticate-user.usecase'

const createUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createUserBodySchema)

@Controller('/auth/session')
@Public()
export class AuthenticateUser {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}
  @Post('')
  @HttpCode(200)
  async handle(@Body(bodyValidationPipe) body: CreateUserBodySchema) {
    const { email, password } = body

    const result = await this.authenticateUserUseCase.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}
