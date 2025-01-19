import { Entity } from '@/core/entities/entity'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface benefitProps {
  roleId: UniqueEntityid[]
  name: string
  value: number
  description?: string
  conditions?: string
  createdAt: Date
  updatedAt?: Date | null
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
    return this.props.conditions ?? ''
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set value(value: number) {
    this.props.value = value
    this.touch()
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  set conditions(conditions: string) {
    this.props.conditions = conditions
    this.touch()
  }

  static create(
    props: Optional<
      benefitProps,
      'description' | 'conditions' | 'createdAt' | 'roleId'
    >,
    id?: UniqueEntityid,
  ) {
    const benefit = new Benefit(
      {
        ...props,
        roleId: props.roleId ?? [],
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return benefit
  }
}
