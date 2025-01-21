import { Role } from '@/domain/sistem/enterprise/entities/role'

export class rolePresenter {
  static toHttp(role: Role) {
    return {
      id: role.id.toString(),
      employeeId: role.employeeId.toString(),
      name: role.name,
      description: role.description,
      pay: role.pay,
      hourlyRate: role.hourlyRate,
      weeklyHours: role.weeklyHours,
      benefitsIds: role.benefitsIds.map((benefit) => benefit.toString()),
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
    }
  }
}
