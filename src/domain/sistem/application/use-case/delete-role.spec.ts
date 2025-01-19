import { MakeRole } from 'test/factories/make-role.fatory'
import { InMemoryRoleRepository } from 'test/repositories/in-memory-role.repository'
import { DeleteRoleUseCase } from './delete-role.usecase'

let inMemoryRoleRepository: InMemoryRoleRepository

let sut: DeleteRoleUseCase
describe('delete role test', () => {
  beforeEach(() => {
    inMemoryRoleRepository = new InMemoryRoleRepository()
    sut = new DeleteRoleUseCase(inMemoryRoleRepository)
  })

  it('should be able to delete a role', async () => {
    const role = MakeRole()

    await inMemoryRoleRepository.create(role)

    const result = await sut.execute({
      roleId: role.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryRoleRepository.items).toHaveLength(0)
  })
})
