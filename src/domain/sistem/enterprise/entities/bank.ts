import { Entity } from '@/core/entities/entity'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'

export interface bankProps {
  employeeId: UniqueEntityid
  bankName: string
  agencyNumber: string
  accountNumber: string
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

  set bankName(bankName: string) {
    this.props.bankName = bankName
  }

  set agencyNumber(agencyNumber: string) {
    this.props.agencyNumber = agencyNumber
  }

  set accountNumber(accountNumber: string) {
    this.props.accountNumber = accountNumber
  }

  static create(props: bankProps, id?: UniqueEntityid) {
    const bankDetails = new Bank(
      {
        ...props,
      },
      id,
    )

    return bankDetails
  }
}
