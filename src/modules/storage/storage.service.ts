import {Upload} from "@aws-sdk/lib-storage";
import { Injectable } from '@nestjs/common';
import { StorageClient } from '../../configs/storage.config';

@Injectable()
export class StorageService {

  constructor(private readonly storageClient: StorageClient) {}

  public async uploadFile(file:any, folderPath: string = "", userId?: string) {
    const key = folderPath.endsWith("/") ? folderPath : `${folderPath}/`;
    const fileName: string = file.originalname.startsWith("/") ? file.originalname.slice(1) : file.originalname;

    const uploadParams = {
      Bucket: "",
      Body: file.buffer,
      Key: `${key}${fileName}`,
    };

    const upload = new Upload({
      client: this.storageClient,
      params: uploadParams,
    });

    upload.on("httpUploadProgress", (progress) => {});


    return await upload.done();
  }

  public async getAllFiles(folderPath: string): Promise<string[]> {
    const params = {
      Bucket: "",
      Prefix: folderPath,
    };

    const data = await this.storageClient.listObjectsV2(params);
    return data.Contents?.map(item => this.getFileLocation(item.Key)) ?? [];
  }

  public getFileLocation(filePath: string): string {
    // return getFileLocation(S3_BUCKET_NAME, S3_REGION, filePath);
    return ""; //todo
  }
}
