import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { Benefit } from './benefit'
import { Entity } from '@/core/entities/entity'

export interface roleProps {
  employees: UniqueEntityid[]
  name: string
  description: string
  hourlyRate: number
  weeklyHours: number
  benefits: Benefit[]
}

export class Role extends Entity<roleProps> {
  get employees() {
    return this.props.employees
  }

  get name() {
    return this.props.name
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

  get benefits() {
    return this.props.benefits
  }

  set name(name: string) {
    this.props.name = name
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

  static create(props: roleProps, id?: UniqueEntityid) {
    const role = new Role(
      {
        ...props,
        benefits: props.benefits ?? [],
      },
      id,
    )

    return role
  }
}
