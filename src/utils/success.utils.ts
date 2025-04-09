import { ApiProperty } from '@nestjs/swagger';

export class Success {
  @ApiProperty({ example: 'Success', description: 'The name of the response' })
  name: 'Success';

  @ApiProperty({ example: 'Operation completed successfully', description: 'The success message' })
  message: string;

  @ApiProperty({ example: 200, description: 'The HTTP status code' })
  status: 200;

  constructor(message: string) {
    this.message = message;
    this.name = 'Success';
    this.status = 200;
  }
}