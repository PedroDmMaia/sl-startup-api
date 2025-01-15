import { Entity } from '@/core/entities/entity'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface bankProps {
  employeeId: UniqueEntityid
  bankName: string
  agencyNumber: string
  accountNumber: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Bank extends Entity<bankProps> {
  get employeeId() {
    return this.props.employeeId
  }

  get bankName() {
    return this.props.bankName
  }

  get agencyNumber() {
    return this.props.agencyNumber
  }

  get accountNumber() {
    return this.props.accountNumber
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

  set bankName(bankName: string) {
    this.props.bankName = bankName
    this.touch()
  }

  set agencyNumber(agencyNumber: string) {
    this.props.agencyNumber = agencyNumber
    this.touch()
  }

  set accountNumber(accountNumber: string) {
    this.props.accountNumber = accountNumber
    this.touch()
  }

  static create(props: Optional<bankProps, 'createdAt'>, id?: UniqueEntityid) {
    const bankDetails = new Bank(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return bankDetails
  }
}
