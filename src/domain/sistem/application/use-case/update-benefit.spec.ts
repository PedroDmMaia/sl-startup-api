import { InMemoryBenefitRepository } from 'test/repositories/in-memory-benfit.repository'
import { InMemoryRoleRepository } from 'test/repositories/in-memory-role.repository'
import { MakeRole } from 'test/factories/make-role.fatory'
import { MakeBenefit } from 'test/factories/make-benefit.factory'
import { UpdateBenefitUseCase } from './update-benefit.usecase'

let inMemoryBenefitRepository: InMemoryBenefitRepository
let inMemoryRoleRepository: InMemoryRoleRepository

let sut: UpdateBenefitUseCase
describe('update benefit test', () => {
  beforeEach(() => {
    inMemoryRoleRepository = new InMemoryRoleRepository()
    inMemoryBenefitRepository = new InMemoryBenefitRepository()

    sut = new UpdateBenefitUseCase(inMemoryBenefitRepository)
  })

  it('should be able to update a benefit', async () => {
    const role = MakeRole({
      name: 'Manager',
    })

    await inMemoryRoleRepository.create(role)

    const benfit = MakeBenefit({
      roleId: [role.id],
      value: 5000,
      description: 'Senior level',
      conditions: ['Senior experience'],
    })

    await inMemoryBenefitRepository.create(benfit)

    const result = await sut.execute({
      benefitId: benfit.id,
      name: 'Manager',
      value: 5500,
      description: 'Senior level',
      conditions: ['Senior experience'],
    })

    if (result.isRight()) {
      expect(result.value.benefit.value).toEqual(5500)
    }
  })
})
