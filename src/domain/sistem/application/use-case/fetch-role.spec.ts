import { FetchRoleUseCase } from './fetch-role.usecase'
import { InMemoryRoleRepository } from 'test/repositories/in-memory-role.repository'
import { MakeRole } from 'test/factories/make-role.fatory'

let inMemoryRoleRepository: InMemoryRoleRepository

let sut: FetchRoleUseCase
describe('fetch role test', () => {
  beforeEach(() => {
    inMemoryRoleRepository = new InMemoryRoleRepository()

    sut = new FetchRoleUseCase(inMemoryRoleRepository)
  })

  it('should be able to fetch role', async () => {
    await inMemoryRoleRepository.create(
      MakeRole({
        name: 'Manager',
      }),
    )

    await inMemoryRoleRepository.create(
      MakeRole({
        name: 'Trainee',
      }),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.role).toHaveLength(2)
  })
})
