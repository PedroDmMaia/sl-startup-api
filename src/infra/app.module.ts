import { Module } from '@nestjs/common'
import { HttpModule } from './http/http.module'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env/env'
import { AuthModule } from './auth/auth.module'
import { EnvModule } from './env/env.module'

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    EnvModule,
  ],
})
export class AppModule {}
