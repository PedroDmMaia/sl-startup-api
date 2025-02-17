import { Entity } from '@/core/entities/entity'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface employeeProps {
  name: string
  cpf: string
  rg: string
  email: string
  password: string
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

  get password() {
    return this.props.password
  }

  get phoneNumber() {
    return this.props.phoneNumber
  }

  get isActive() {
    return this.props.isActive
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

  set password(password: string) {
    this.props.password = password
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
