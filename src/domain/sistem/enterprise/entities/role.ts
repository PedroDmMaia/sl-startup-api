import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'

export interface roleProps {
  employeesIds: UniqueEntityid[]
  name: string
  pay: number
  description: string
  hourlyRate: number
  weeklyHours: number
  benefitsIds: UniqueEntityid[]
}

export class Role extends Entity<roleProps> {
  get employeesIds() {
    return this.props.employeesIds
  }

  get name() {
    return this.props.name
  }

  get pay() {
    return this.props.pay
  }

  get description() {
    return this.props.description
  }

  get hourlyRate() {
    return this.props.hourlyRate
  }

  get weeklyHours() {
    return this.props.weeklyHours
  }

  get benefitsIds() {
    return this.props.benefitsIds
  }

  set employeesIds(employeesIds: UniqueEntityid[]) {
    this.props.employeesIds = employeesIds
  }

  set name(name: string) {
    this.props.name = name
  }

  set pay(pay: number) {
    this.props.pay = pay
  }

  set description(description: string) {
    this.props.description = description
  }

  set hourlyRate(hourlyRate: number) {
    this.props.hourlyRate = hourlyRate
  }

  set weeklyHours(weeklyHours: number) {
    this.props.weeklyHours = weeklyHours
  }

  set benefitsIds(benefitsIds: UniqueEntityid[]) {
    this.props.benefitsIds = benefitsIds
  }

  static create(
    props: Optional<roleProps, 'employeesIds' | 'benefitsIds'>,
    id?: UniqueEntityid,
  ) {
    const role = new Role(
      {
        ...props,
        employeesIds: props.employeesIds ?? [],
        benefitsIds: props.benefitsIds ?? [],
      },
      id,
    )

    return role
  }
}
