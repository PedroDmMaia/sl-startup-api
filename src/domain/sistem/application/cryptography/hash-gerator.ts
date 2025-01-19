import { Injectable } from '@nestjs/common'

@Injectable()
export abstract class HashGenator {
  abstract hash(plain: string): Promise<string>
}
