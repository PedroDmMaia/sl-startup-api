import { Benefit } from '@/domain/sistem/enterprise/entities/benefit'

export class benefitPresenter {
  static toHttp(benefit: Benefit) {
    return {
      id: benefit.id.toString(),
      roleId: benefit.roleId.toString(),
      name: benefit.name,
      value: benefit.value,
      description: benefit.description,
      conditions: benefit.conditions,
      createdAt: benefit.createdAt,
      updatedAt: benefit.updatedAt,
    }
  }
}
