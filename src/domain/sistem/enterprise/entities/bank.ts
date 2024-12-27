import { Entity } from 'src/core/entities/entity'
import { UniqueEntityid } from 'src/core/entities/unique-entity-id'

export interface bankDetailsProps {
  empoyeeId: UniqueEntityid
  bankName: string
  agencyNumber: string
  accountNumber: string
}

export class BankDetails extends Entity<bankDetailsProps> {
  get empoyeeId() {
    return this.props.empoyeeId
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

  static create(props: bankDetailsProps, id?: UniqueEntityid) {
    const bankDetails = new BankDetails(
      {
        ...props,
      },
      id,
    )

    return bankDetails
  }
}
