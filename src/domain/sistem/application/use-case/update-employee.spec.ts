import { InMemoryEmployeeRepository } from 'test/repositories/in-memory-employee.repository'
import { Employee } from '../../enterprise/entities/employee'
import { UpdateEmployeeUseCase } from './update-employee.usecase'

let inMemoryEmployeeRepository: InMemoryEmployeeRepository

let sut: UpdateEmployeeUseCase
describe('update employee test', () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository()
    sut = new UpdateEmployeeUseCase(inMemoryEmployeeRepository)
  })

  it('should be able to update a employee', async () => {
    const employee = Employee.create({
      name: 'John Doe',
      cpf: '12345678901',
      rg: '123456789',
      email: 'johndoe@example.com',
      phoneNumber: '1234567890',
      isActive: true,
    })
    await inMemoryEmployeeRepository.create(employee)

    await sut.exeute({
      employeeId: employee.id,
      name: 'John Doe',
      cpf: '12345678901',
      rg: '123456789',
      email: 'johndoe@example.com',
      phoneNumber: '1234567890',
      isActive: false,
    })

    expect(inMemoryEmployeeRepository.items[0].isActive).toEqual(false)
  })
})
