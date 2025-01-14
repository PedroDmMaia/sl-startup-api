import { InMemoryEmployeeRepository } from 'test/repositories/in-memory-employee.repository'

import { MakeEmployee } from 'test/factories/make-employee.factory'
import { AuthenticateUserUseCase } from './authenticate-user.usecase'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user.repostory'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { FakeEncrypter } from 'test/cryptography/faker-encrypter'
import { MakeUser } from 'test/factories/make-user.factory'

let inMemoryEmployeeRepository: InMemoryEmployeeRepository
let inMemoryUserRepository: InMemoryUserRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter

let sut: AuthenticateUserUseCase
describe('create bank test', () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository()
    inMemoryUserRepository = new InMemoryUserRepository(
      inMemoryEmployeeRepository,
    )
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()

    sut = new AuthenticateUserUseCase(
      inMemoryUserRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to create a bank details', async () => {
    const employee = MakeEmployee()

    await inMemoryEmployeeRepository.create(MakeEmployee())

    await inMemoryUserRepository.create(
      MakeUser({
        employeeId: employee.id,
        userName: 'jhon doe',
        password: await fakeHasher.hash('123'),
      }),
    )

    const result = await sut.execute({
      userName: 'jhon doe',
      password: '123',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
