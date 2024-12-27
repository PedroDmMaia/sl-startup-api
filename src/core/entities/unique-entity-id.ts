import { randomUUID } from 'node:crypto'

export class UniqueEntityid {
  private value: string

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }

  equals(id: UniqueEntityid) {
    return id.toValue() === this.value
  }
}
