import { InMemoryBenefitRepository } from 'test/repositories/in-memory-benfit.repository'
import { InMemoryRoleRepository } from 'test/repositories/in-memory-role.repository'
import { MakeRole } from 'test/factories/make-role.fatory'
import { MakeBenefit } from 'test/factories/make-benefit.factory'
import { DeleteBenefitUseCase } from './delete-benefit.usecase'

let inMemoryBenefitRepository: InMemoryBenefitRepository
let inMemoryRoleRepository: InMemoryRoleRepository

let sut: DeleteBenefitUseCase
describe('update benefit test', () => {
  beforeEach(() => {
    inMemoryRoleRepository = new InMemoryRoleRepository()
    inMemoryBenefitRepository = new InMemoryBenefitRepository()

    sut = new DeleteBenefitUseCase(inMemoryBenefitRepository)
  })

  it('should be able to update a benefit', async () => {
    const role = MakeRole({
      name: 'Manager',
    })

    await inMemoryRoleRepository.create(role)

    const benefit = MakeBenefit({
      roleId: [role.id],
    })

    await inMemoryBenefitRepository.create(benefit)

    const result = await sut.execute({ benefitId: benefit.id })

    expect(result.isRight()).toBe(true)
    expect(inMemoryBenefitRepository.items).toHaveLength(0)
  })
})
