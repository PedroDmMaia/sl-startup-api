import { ApiProperty } from '@nestjs/swagger';

export class createDeductionDTO {
  @ApiProperty({
    description: "motivo da deducão",
    example: 'falta',
  })
  reason: string;

  @ApiProperty({
    description: 'Data do ocorrido',
    example: '2025-01-17',
  })
  date: string;

  @ApiProperty({
    description: 'valor do desconto',
    example: 100.00,
  })
  amount: number;

  @ApiProperty({
    description: 'descricao da deducao',
    example: 'informações adicionais',
  })
  description: string;
}
