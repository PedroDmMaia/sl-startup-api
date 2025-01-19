import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'

export interface roleProps {
  employeeId: string
  name: string
  pay: number
  description: string
  hourlyRate: number
  weeklyHours: number
  benefitsIds: UniqueEntityid[]
  createdAt: Date
  updatedAt?: Date | null
}

export class Role extends Entity<roleProps> {
  get employeeId() {
    return this.props.employeeId
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

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set employeeId(employeeId: string) {
    this.props.employeeId = employeeId
    this.touch()
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set pay(pay: number) {
    this.props.pay = pay
    this.touch()
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  set hourlyRate(hourlyRate: number) {
    this.props.hourlyRate = hourlyRate
    this.touch()
  }

  set weeklyHours(weeklyHours: number) {
    this.props.weeklyHours = weeklyHours
    this.touch()
  }

  set benefitsIds(benefitsIds: UniqueEntityid[]) {
    this.props.benefitsIds = benefitsIds
    this.touch()
  }

  static create(
    props: Optional<roleProps, 'benefitsIds' | 'createdAt'>,
    id?: UniqueEntityid,
  ) {
    const role = new Role(
      {
        ...props,
        benefitsIds: props.benefitsIds ?? [],
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return role
  }
}
