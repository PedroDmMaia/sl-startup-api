import { Entity } from 'src/core/entities/entity'
import { UniqueEntityid } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

export interface employeeProps {
  name: string
  cpf: string
  rg: string
  email: string
  phoneNumber: string
  isActive: boolean
  createdAt: Date
  updatedAt?: Date | null
}

export class Employee extends Entity<employeeProps> {
  get name() {
    return this.props.name
  }

  get cpf() {
    return this.props.cpf
  }

  get rg() {
    return this.props.rg
  }

  get email() {
    return this.props.email
  }

  get phoneNumber() {
    return this.props.phoneNumber
  }

  get isActive() {
    return this.props.isActive
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set cpf(cpf: string) {
    this.props.cpf = cpf
    this.touch()
  }

  set rg(rg: string) {
    this.props.rg = rg
    this.touch()
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  set phoneNumber(phoneNumber: string) {
    this.props.phoneNumber = phoneNumber
    this.touch()
  }

  set isActive(isActive) {
    this.props.isActive = isActive
    this.touch()
  }

  static create(
    props: Optional<employeeProps, 'createdAt' | 'isActive'>,
    id?: UniqueEntityid,
  ) {
    const employee = new Employee(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        isActive: props.isActive ?? true,
      },
      id,
    )

    return employee
  }
}
