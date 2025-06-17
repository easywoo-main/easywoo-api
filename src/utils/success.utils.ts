import { ApiProperty } from '@nestjs/swagger';
import { HttpException } from '@nestjs/common';

export class Success extends HttpException {
  @ApiProperty({ example: 'Success', description: 'The name of the response' })
  name: 'Success';

  @ApiProperty({ example: 'Operation completed successfully', description: 'The success message' })
  message: string;

  constructor(message: string) {
    super(message, 200)
    this.message = message;
    this.name = 'Success';
  }

  toJSON() {
    return {
      name: this.name,
      status: this.getStatus(),
      message: this.message,
    };
  }}