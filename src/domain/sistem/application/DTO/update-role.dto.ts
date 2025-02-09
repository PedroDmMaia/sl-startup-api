import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDTO {
  @ApiProperty({
    description: "Nome do cargo",
    example: 'RH',
  })
  name: string;

  @ApiProperty({
    description: 'salario total',
    example: 3600,
  })
  pay: number;

  @ApiProperty({
    description: 'descricão do cargo',
    example: 'funcionário dos Recursos Humanos',
  })
  description: string;

  @ApiProperty({
    description: 'Valor por hora',
    example: 20,
  })
  hourlyRate: number;

  @ApiProperty({
    description: 'horas de trabalho',
    example: 40,
  })
  weeklyHours: number;

  @ApiProperty({
    description: 'Lista de beneficios (se caso não for atribuir agora, deixar em branco)',
    example: ['']
  })
  benefitsIds: string[];
}
