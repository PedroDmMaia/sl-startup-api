import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmployeeDTO {
  @ApiProperty({
    description: "Nome do funcionário",
    example: 'Pedro',
  })
  name: string;

  @ApiProperty({
    description: 'CPF do funcionário',
    example: '00000000000',
  })
  cpf: string;

  @ApiProperty({
    description: 'RG do funcionário',
    example: '000000000',
  })
  rg: string;

  @ApiProperty({
    description: 'Email do funcionário',
    example: 'pedro@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Insira uma senha (caso não seja do cargo de RH deixar em branco)',
    example: '',
  })
  password: string;

  @ApiProperty({
    description: 'Número do funcionário',
    example: '00000000000',
  })
  phoneNumber: string;
}
