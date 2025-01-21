import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { FetchEmployeeUseCase } from '@/domain/sistem/application/use-case/fetch-employee.usecase'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation.pipe'
import { employeePresenter } from '../presenters/employee.presenter'

const pageQueryParamsSchema = z.object({
  name: z.string().optional(),
  page: z.coerce.number().min(1).optional().default(1),
})

type PageQueryParamsSchema = z.infer<typeof pageQueryParamsSchema>

const queryValdiationPipe = new ZodValidationPipe(pageQueryParamsSchema)

@Controller('/employee/list')
export class FetchEmployee {
  constructor(private fetchEmployeeUseCase: FetchEmployeeUseCase) {}
  @Get('')
  async handle(@Query(queryValdiationPipe) query: PageQueryParamsSchema) {
    const { page, name } = query

    const result = await this.fetchEmployeeUseCase.execute({
      page,
      name,
    })

    if (result.isLeft()) {
      return new BadRequestException()
    }

    const { employee } = result.value

    return { employees: employee.map((item) => employeePresenter.toHttp(item)) }
  }
}
