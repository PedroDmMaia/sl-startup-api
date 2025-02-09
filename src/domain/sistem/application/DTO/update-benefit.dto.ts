import { ApiProperty } from '@nestjs/swagger';

export class UpdateBenefitDTO {
  @ApiProperty({
    description: "roleId's",
  })
  roleIds: string[];

  @ApiProperty({
    description: 'nome do beneficio',
    example: 'vale refeição',
  })
  name: string;

  @ApiProperty({
    description: 'valor de beneficio',
    example: 555.00,
  })
  value: number;

  @ApiProperty({
    description: 'descricao do benefício',
    example: 'vale refeição para funcionarios CLT',
  })
  description: string;

  @ApiProperty({
    description: 'condicoes para o benefício',
    example: 'estar no regime CLT',
  })
  conditions: string;
}
