import { Entity } from '@/core/entities/entity'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface benefitProps {
  roleId: UniqueEntityid[]
  name: string
  value: number
  description?: string
  conditions?: string[]
}

export class Benefit extends Entity<benefitProps> {
  get roleId() {
    return this.props.roleId
  }

  get name() {
    return this.props.name
  }

  get value() {
    return this.props.value
  }

  get description() {
    return this.props.description ?? ''
  }

  get conditions() {
    return this.props.conditions ?? []
  }

  set name(name: string) {
    this.props.name = name
  }

  set value(value: number) {
    this.props.value = value
  }

  set description(description: string) {
    this.props.description = description
  }

  set conditions(conditions: string[]) {
    this.props.conditions = conditions
  }

  static create(
    props: Optional<benefitProps, 'description' | 'conditions'>,
    id?: UniqueEntityid,
  ) {
    const benefit = new Benefit({ ...props }, id)

    return benefit
  }
}
