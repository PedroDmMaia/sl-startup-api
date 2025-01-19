import { InMemoryEmployeeRepository } from 'test/repositories/in-memory-employee.repository'
import { UpdateEmployeeUseCase } from './update-employee.usecase'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { MakeEmployee } from 'test/factories/make-employee.factory'

let inMemoryEmployeeRepository: InMemoryEmployeeRepository
let fakeHasher: FakeHasher

let sut: UpdateEmployeeUseCase
describe('update employee test', () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository()
    fakeHasher = new FakeHasher()
    sut = new UpdateEmployeeUseCase(inMemoryEmployeeRepository, fakeHasher)
  })

  it('should be able to update a employee', async () => {
    const employee = MakeEmployee({
      password: await fakeHasher.hash('123'),
    })
    await inMemoryEmployeeRepository.create(employee)

    await sut.execute({
      employeeId: employee.id.toString(),
      name: 'John Doe',
      cpf: '12345678901',
      rg: '123456789',
      email: 'johndoe@example.com',
      password: '123',
      phoneNumber: '1234567890',
      isActive: false,
    })

    expect(inMemoryEmployeeRepository.items[0].isActive).toEqual(false)
  })
})
