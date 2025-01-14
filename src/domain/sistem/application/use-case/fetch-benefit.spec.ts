import { MakeRole } from 'test/factories/make-role.fatory'
import { FetchBenefitUseCase } from './fetch-benefit.usecase'
import { InMemoryBenefitRepository } from 'test/repositories/in-memory-benfit.repository'
import { InMemoryRoleRepository } from 'test/repositories/in-memory-role.repository'
import { UniqueEntityid } from '@/core/entities/unique-entity-id'
import { MakeBenefit } from 'test/factories/make-benefit.factory'

let inMemoryBenefitRepository: InMemoryBenefitRepository
let inMemoryRoleRepository: InMemoryRoleRepository

let sut: FetchBenefitUseCase
describe('fetch benefit test', () => {
  beforeEach(() => {
    inMemoryBenefitRepository = new InMemoryBenefitRepository()
    inMemoryRoleRepository = new InMemoryRoleRepository()

    sut = new FetchBenefitUseCase(inMemoryBenefitRepository)
  })

  it('should be able to fetch benefit', async () => {
    await inMemoryRoleRepository.create(
      MakeRole({}, new UniqueEntityid('role-1')),
    )

    await inMemoryBenefitRepository.create(
      MakeBenefit({
        roleId: [new UniqueEntityid('role-1')],
      }),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.benefit).toHaveLength(1)
  })
})
