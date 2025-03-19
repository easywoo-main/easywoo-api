import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { userMiddleware } from './user.middleware';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  public async onModuleInit() {
    this.$use(userMiddleware);
    await this.$connect();
  }

  public async onModuleDestroy() {
    console.log('Disconnected from database successfully');
    await this.$disconnect();
  }
}
