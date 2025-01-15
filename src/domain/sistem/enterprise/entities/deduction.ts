import { Entity } from '@/core/entities/entity'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface deductionsProps {
  employeeId: UniqueEntityid
  reason: string
  date: Date
  amount: number
  description: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Deductions extends Entity<deductionsProps> {
  get employeeId() {
    return this.props.employeeId
  }

  get reason() {
    return this.props.reason
  }

  get date() {
    return this.props.date
  }

  get amount() {
    return this.props.amount
  }

  get description() {
    return this.props.description
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

  set amount(amount: number) {
    this.props.amount = amount
    this.touch()
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  static create(
    props: Optional<deductionsProps, 'createdAt'>,
    id?: UniqueEntityid,
  ) {
    const deduction = new Deductions(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return deduction
  }
}
