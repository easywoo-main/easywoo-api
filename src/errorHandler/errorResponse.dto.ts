import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse<T = any> {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  additionalInfo?: T;

  @ApiProperty()
  path: string;

  @ApiProperty()
  timestamp?: string = new Date().toISOString();
}
