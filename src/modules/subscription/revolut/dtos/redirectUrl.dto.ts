import { ApiProperty } from "@nestjs/swagger";

export class RedirectUrlDto {
  @ApiProperty({ description: 'RedirectUrl' })
  redirectUrl: string
}