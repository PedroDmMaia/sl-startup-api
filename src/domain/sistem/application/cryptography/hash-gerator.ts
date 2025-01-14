export abstract class HashGenator {
  abstract hash(plain: string): Promise<string>
}
