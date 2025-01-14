import { InMemoryUserRepository } from 'test/repositories/in-memory-user.repostory'
import { DeleteUserUseCase } from './delete-user.usecase'
import { InMemoryEmployeeRepository } from 'test/repositories/in-memory-employee.repository'
import { MakeEmployee } from 'test/factories/make-employee.factory'
import { MakeUser } from 'test/factories/make-user.factory'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryEmployeeRepository: InMemoryEmployeeRepository

let sut: DeleteUserUseCase
describe('delete user test', () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository()
    inMemoryUserRepository = new InMemoryUserRepository(
      inMemoryEmployeeRepository,
    )
    sut = new DeleteUserUseCase(inMemoryUserRepository)
  })

  it('should be able to delete a user', async () => {
    const employee = MakeEmployee()

    await inMemoryEmployeeRepository.create(employee)

    const user = MakeUser()

    await inMemoryUserRepository.create(user)

    const result = await sut.execute({
      userId: user.id,
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserRepository.items).toHaveLength(0)
  })
})
