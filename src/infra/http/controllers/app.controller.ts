import { Public } from '@/infra/auth/public'
import { Controller, Post } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Controller('/session')
@Public()
export class AppController {
  constructor(private jwt: JwtService) {}

  @Post()
  async handle() {
    const token = this.jwt.sign({ sub: 'user-id' })

    return { token }
  }
}
