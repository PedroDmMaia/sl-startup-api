import { InMemoryEmployeeRepository } from 'test/repositories/in-memory-employee.repository'
import { CreateEmployeeUseCase } from './create-employee.usecase'
import { Employee } from '../../enterprise/entities/employee'
import { UserWithSameInformationError } from '@/core/errors/error/user-with-same-informations.error'
import { FakeHasher } from 'test/cryptography/fake-hasher'

let inMemoryEmployeeRepository: InMemoryEmployeeRepository
let fakeHasher: FakeHasher

let sut: CreateEmployeeUseCase
describe('create employee test', () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository()
    fakeHasher = new FakeHasher()
    sut = new CreateEmployeeUseCase(inMemoryEmployeeRepository, fakeHasher)
  })

  it('should be able to create a employee', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: '12345678901',
      rg: '123456789',
      email: 'johndoe@example.com',
      password: '123',
      phoneNumber: '(11) 98765-4321',
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(inMemoryEmployeeRepository.items[0]).toEqual(result.value.employee)
    }
  })

  it('not should be able to create a employee', async () => {
    const existingEmpolyee = Employee.create({
      name: 'John Doe',
      cpf: '12345678901',
      rg: '123456789',
      email: 'johndoe@example.com',
      password: '123',
      phoneNumber: '(11) 98765-4321',
    })

    await inMemoryEmployeeRepository.create(existingEmpolyee)

    const result = await sut.execute({
      name: 'John Doe',
      cpf: '12345678901',
      rg: '123456789',
      email: 'johndoe@example.com',
      password: '123',
      phoneNumber: '(11) 98765-4321',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserWithSameInformationError)
  })
})
