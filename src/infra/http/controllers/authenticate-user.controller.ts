import {
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { Public } from '@/infra/auth/public'
import { AuthenticateUserUseCase } from '@/domain/sistem/application/use-case/authenticate-user.usecase'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthUserDTO } from '@/domain/sistem/application/DTO/auth-user.dto'

const createUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createUserBodySchema)

@ApiTags('Auth')
@Controller('/auth/session')
@Public()
export class AuthenticateUser {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Post('')
  @HttpCode(200)
  @ApiOperation({ summary: 'Autenticar um usuário' })
  @ApiBody({ type: AuthUserDTO, description: 'Dados do usuário' })
  @ApiResponse({ status: 200, description: 'Autenticação bem-sucedida' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async handle(@Body(bodyValidationPipe) body: CreateUserBodySchema) {
    const { email, password } = body

    const result = await this.authenticateUserUseCase.execute({
      email,
      password,
    })

    if (result.isLeft()) {
      throw new NotFoundException('Usuário não encontrado')
    }

    const { accessToken } = result.value

    return {
      access_token: accessToken,
    }
  }
}
