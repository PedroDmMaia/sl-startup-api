import { InMemoryEmployeeRepository } from 'test/repositories/in-memory-employee.repository'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user.repostory'
import { UpdateUserUseCase } from './update-user.usecase'
import { MakeEmployee } from 'test/factories/make-employee.factory'
import { MakeUser } from 'test/factories/make-user.factory'

let inMemoryEmployeeRepository: InMemoryEmployeeRepository
let inMemoryUserRepository: InMemoryUserRepository

let sut: UpdateUserUseCase
describe('update user details test', () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository()
    inMemoryUserRepository = new InMemoryUserRepository(
      inMemoryEmployeeRepository,
    )
    sut = new UpdateUserUseCase(inMemoryUserRepository)
  })

  it('should be able to update a user details', async () => {
    const employee = MakeEmployee()
    await inMemoryEmployeeRepository.create(employee)

    const user = MakeUser({
      employeeId: employee.id,
    })
    await inMemoryUserRepository.create(user)

    const result = await sut.execute({
      employeeId: employee.id,
      userName: user.userName,
      password: user.password,
      isActive: false,
    })

    await inMemoryUserRepository.update(user)

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.user.isActive).toBe(false)
    }
  })
})
