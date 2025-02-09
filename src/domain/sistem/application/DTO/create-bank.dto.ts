import { ApiProperty } from '@nestjs/swagger';

export class createBankDetailsDTO {
  @ApiProperty({
    description: 'Nome do banco',
    example: 'Banco exemplo',
  })
  bankName: string;

  @ApiProperty({
    description: 'número de agencia',
    example: '0000-0',
  })
  agencyNumber: string;

  @ApiProperty({
    description: 'número da conta',
    example: '00',
  })
  accountNumber: string;
}
