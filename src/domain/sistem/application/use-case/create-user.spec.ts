import { InMemoryEmployeeRepository } from 'test/repositories/in-memory-employee.repository'
import { CreateUserUseCase } from './create-user.usecase'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user.repostory'
import { MakeEmployee } from 'test/factories/make-employee.factory'
import { FakeHasher } from 'test/cryptography/fake-hasher'

let inMemoryEmployeeRepository: InMemoryEmployeeRepository
let inMemoryUserRepository: InMemoryUserRepository
let fakeHasher: FakeHasher

let sut: CreateUserUseCase

describe('crete user test', async () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository()
    inMemoryUserRepository = new InMemoryUserRepository(
      inMemoryEmployeeRepository,
    )
    fakeHasher = new FakeHasher()
    sut = new CreateUserUseCase(
      inMemoryUserRepository,
      inMemoryEmployeeRepository,
      fakeHasher,
    )
  })

  it('shoud be able create a user', async () => {
    const employee = MakeEmployee()

    await inMemoryEmployeeRepository.create(employee)

    const result = await sut.execute({
      employeeId: employee.id,
      userName: 'johndoe',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      const user = result.value.user
      expect(user!.userName).toBe('johndoe')
      expect(user!.password).toBe('123456-hashed')
    }
  })

  it('should hash user password upon creation', async () => {
    const employee = MakeEmployee()

    await inMemoryEmployeeRepository.create(employee)

    const result = await sut.execute({
      employeeId: employee.id,
      userName: 'johndoe',
      password: '123456',
    })

    const hashedPAssword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserRepository.items[0].password).toEqual(hashedPAssword)
  })
})
