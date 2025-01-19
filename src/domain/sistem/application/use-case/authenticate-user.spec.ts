import { InMemoryEmployeeRepository } from 'test/repositories/in-memory-employee.repository'

import { MakeEmployee } from 'test/factories/make-employee.factory'
import { AuthenticateUserUseCase } from './authenticate-user.usecase'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { FakeEncrypter } from 'test/cryptography/faker-encrypter'
import { InMemoryRoleRepository } from 'test/repositories/in-memory-role.repository'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { MakeRole } from 'test/factories/make-role.fatory'

let inMemoryEmployeeRepository: InMemoryEmployeeRepository
let inMemoryRoleRepository: InMemoryRoleRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter

let sut: AuthenticateUserUseCase
describe('create authenticate test', () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository()
    inMemoryRoleRepository = new InMemoryRoleRepository()
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()

    sut = new AuthenticateUserUseCase(
      inMemoryEmployeeRepository,
      inMemoryRoleRepository,
      fakeHasher,
      fakeEncrypter,
    )
  })

  it('should be able to authneticate user', async () => {
    const employee = MakeEmployee(
      {
        email: 'jhon@example.com',
        password: await fakeHasher.hash('123'),
      },
      new UniqueEntityid('employee-1'),
    )

    await inMemoryEmployeeRepository.create(employee)

    await inMemoryRoleRepository.create(
      MakeRole({
        employeeId: employee.id.toString(),
        name: 'rh',
      }),
    )

    const result = await sut.execute({
      email: 'jhon@example.com',
      password: '123',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
