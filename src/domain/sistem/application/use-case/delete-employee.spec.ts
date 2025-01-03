import { InMemoryEmployeeRepository } from 'test/repositories/in-memory-employee.repository'
import { DeleteEmployeeUseCase } from './delete-employee.usecase'
import { Employee } from '../../enterprise/entities/employee'

let inMemoryEmployeeRepository: InMemoryEmployeeRepository

let sut: DeleteEmployeeUseCase
describe('delete employee test', () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository()
    sut = new DeleteEmployeeUseCase(inMemoryEmployeeRepository)
  })

  it('should be able to delete a employee', async () => {
    const employee = Employee.create({
      name: 'John Doe',
      cpf: '12345678901',
      rg: '123456789',
      email: 'johndoe@example.com',
      phoneNumber: '1234567890',
    })

    await inMemoryEmployeeRepository.create(employee)

    await sut.exeute({ id: employee.id.toString() })

    expect(inMemoryEmployeeRepository.items).toHaveLength(0)
  })
})
