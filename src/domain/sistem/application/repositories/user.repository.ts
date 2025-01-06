import { User } from '../../enterprise/entities/user'

export abstract class UserRepository {
  abstract create(user: User): Promise<void>
  abstract update(user: User): Promise<void>
  abstract delete(id: string): Promise<void>
  abstract findById(id: string): Promise<User | null>
  abstract findByEmployeeId(id: string): Promise<User | null>
}
