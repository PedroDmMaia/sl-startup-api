import { InMemoryBenefitRepository } from 'test/repositories/in-memory-benfit.repository'
import { InMemoryRoleRepository } from 'test/repositories/in-memory-role.repository'
import { CreateBenefitUseCase } from './create-benefit.usecase'
import { MakeRole } from 'test/factories/make-role.fatory'

let inMemoryBenefitRepository: InMemoryBenefitRepository
let inMemoryRoleRepository: InMemoryRoleRepository

let sut: CreateBenefitUseCase
describe('create benefit test', () => {
  beforeEach(() => {
    inMemoryRoleRepository = new InMemoryRoleRepository()
    inMemoryBenefitRepository = new InMemoryBenefitRepository()

    sut = new CreateBenefitUseCase(
      inMemoryBenefitRepository,
      inMemoryRoleRepository,
    )
  })

  it('should be able to create a benefit', async () => {
    const role = MakeRole({
      name: 'Manager',
    })

    await inMemoryRoleRepository.create(role)

    const result = await sut.execute({
      roleId: [role.id.toString()],
      name: 'Vale transporte',
      value: 100,
      description: 'Transportation allowance for the employee',
      conditions: ['Working days'],
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(result.value.benefit).toBeTruthy()
      expect(result.value.benefit.name).toBe('Vale transporte')
      expect(result.value.benefit.value).toBe(100)
      expect(result.value.benefit.description).toBe(
        'Transportation allowance for the employee',
      )
      expect(result.value.benefit.conditions).toEqual(['Working days'])
    }
  })
})
