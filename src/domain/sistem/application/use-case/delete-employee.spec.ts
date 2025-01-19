import { InMemoryEmployeeRepository } from 'test/repositories/in-memory-employee.repository'
import { DeleteEmployeeUseCase } from './delete-employee.usecase'
import { MakeEmployee } from 'test/factories/make-employee.factory'

let inMemoryEmployeeRepository: InMemoryEmployeeRepository

let sut: DeleteEmployeeUseCase
describe('delete employee test', () => {
  beforeEach(() => {
    inMemoryEmployeeRepository = new InMemoryEmployeeRepository()
    sut = new DeleteEmployeeUseCase(inMemoryEmployeeRepository)
  })

  it('should be able to delete a employee', async () => {
    const employee = MakeEmployee()

    await inMemoryEmployeeRepository.create(employee)

    await sut.execute({ id: employee.id.toString() })

    expect(inMemoryEmployeeRepository.items).toHaveLength(0)
  })
})
