import { InMemoryDeductionRepository } from 'test/repositories/in-memory-deductions.repository'

import { DeleteDeductionUseCase } from './delete-deduction.usecase'
import { MakeDeduction } from 'test/factories/make-deductions.factory'

let inMemoryDeductionRepository: InMemoryDeductionRepository

let sut: DeleteDeductionUseCase
describe('create deduction test', () => {
  beforeEach(() => {
    inMemoryDeductionRepository = new InMemoryDeductionRepository()

    sut = new DeleteDeductionUseCase(inMemoryDeductionRepository)
  })

  it('should be able to delete a deduction', async () => {
    const deduction = MakeDeduction()

    await inMemoryDeductionRepository.create(deduction)

    await sut.execute({ deductionId: deduction.id })

    expect(inMemoryDeductionRepository.items).toHaveLength(0)
  })
})
