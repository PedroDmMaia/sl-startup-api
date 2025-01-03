import { Entity } from '@/core/entities/entity'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'

export interface userProps {
  employeeId: UniqueEntityid
  userName: string
  password: string
  isActive: boolean
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

  set userName(name: string) {
    if (!name || name.trim().length < 3) {
      throw new Error('Username must have at least 3 characters')
    }
    this.props.userName = name
  }

  set password(password: string) {
    if (!password || password.trim().length < 4) {
      throw new Error('Password must have at least 4 characters')
    }
    this.password = password
  }

  set isActive(isActive: boolean) {
    this.isActive = isActive
  }

  static create(props: userProps, id?: UniqueEntityid) {
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
