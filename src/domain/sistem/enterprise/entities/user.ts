import { Entity } from '@/core/entities/entity'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface userProps {
  employeeId: UniqueEntityid
  userName: string
  password: string
  isActive: boolean
  createdAt: Date
  updatedAt?: Date | null
}

export class User extends Entity<userProps> {
  get employeeId() {
    return this.props.employeeId
  }

  get userName() {
    return this.props.userName
  }

  get password() {
    return this.props.password
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

  set userName(name: string) {
    if (!name || name.trim().length < 3) {
      throw new Error('Username must have at least 3 characters')
    }
    this.props.userName = name
    this.touch()
  }

  set password(password: string) {
    if (!password || password.trim().length < 4) {
      throw new Error('Password must have at least 4 characters')
    }
    this.props.password = password
    this.touch()
  }

  set isActive(isActive: boolean) {
    this.props.isActive = isActive
    this.touch()
  }

  static create(props: Optional<userProps, 'isActive'>, id?: UniqueEntityid) {
    const user = new User(
      {
        ...props,
        isActive: props.isActive ?? true,
      },
      id,
    )

    return user
  }
}
