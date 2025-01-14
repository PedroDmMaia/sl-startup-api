import { Encrypter } from '@/domain/sistem/application/cryptography/encrypter'
import { Module } from '@nestjs/common'
import { JwtEncrypter } from './jwt-encrypter'
import { HashGenator } from '@/domain/sistem/application/cryptography/hash-gerator'
import { BcryptHasher } from './bcrypt-hasher'
import { HashCompare } from '@/domain/sistem/application/cryptography/hash-compare'

@Module({
  providers: [
    { provide: Encrypter, useClass: JwtEncrypter },
    { provide: HashGenator, useClass: BcryptHasher },
    { provide: HashCompare, useClass: BcryptHasher },
  ],
  exports: [Encrypter, HashCompare, HashGenator],
})
export class cryptographyModule {}
