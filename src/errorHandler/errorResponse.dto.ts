import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse<T = any> {
  @ApiProperty({ description: 'HTTP status code of the error response' })
  statusCode: number;

  @ApiProperty({ description: 'Error message describing the error' })
  message: string;

  @ApiProperty({ description: 'Name of the error' })
  name: string;

  @ApiProperty({ required: false })
  additionalInfo?: T;

  @ApiProperty({ description: 'Path where the error occurred' })
  path: string;

  @ApiProperty({ description: 'Timestamp when the error occurred' })
  timestamp?: string = new Date().toISOString();
}
