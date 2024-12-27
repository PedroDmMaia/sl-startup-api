import { Module } from '@nestjs/common'
import { HttpModule } from './http/http.module'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env/env'

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
