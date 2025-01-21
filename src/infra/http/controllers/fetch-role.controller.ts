import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { FetchRoleUseCase } from '@/domain/sistem/application/use-case/fetch-role.usecase'
import { rolePresenter } from '../presenters/role.presenter'

const pageQueryParamsSchema = z.object({
  name: z.string().optional(),
  page: z.coerce.number().min(1).optional().default(1),
})

type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

const queryValdiationPipe = new ZodValidationPipe(pageQueryParamsSchema)

@Controller('/employee/role/list')
export class FetchRole {
  constructor(private fetchRoleUseCase: FetchRoleUseCase) {}
  @Get('')
  async handle(@Query(queryValdiationPipe) query: PageQueryParamsSchema) {
    const { page, name } = query

    const result = await this.fetchRoleUseCase.execute({
      page,
      name,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }

    const { role } = result.value

    return { roles: role.map((item) => rolePresenter.toHttp(item)) }
  }
}
