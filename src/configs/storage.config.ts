import { S3 } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageClient extends S3 {
  constructor(private readonly configService: ConfigService) {
    super(
      {region: "us-east-1"}
    );
    // console.log(this);
  }
}