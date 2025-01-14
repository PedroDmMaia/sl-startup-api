import { HashCompare } from '@/domain/sistem/application/cryptography/hash-compare'
import { HashGenator } from '@/domain/sistem/application/cryptography/hash-gerator'
import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcryptjs'

@Injectable()
export class BcryptHasher implements HashGenator, HashCompare {
  private HASH_SALT_LENGTH = 8
  async hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH)
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
