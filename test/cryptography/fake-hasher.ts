import { HashCompare } from '@/domain/sistem/application/cryptography/hash-compare'
import { HashGenator } from '@/domain/sistem/application/cryptography/hash-gerator'

export class FakeHasher implements HashGenator, HashCompare {
  async hash(plain: string): Promise<string> {
    return plain.concat('-hashed')
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return plain.concat('-hashed') === hash
  }
}
