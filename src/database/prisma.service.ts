import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { userMiddleware } from './user.middleware';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      errorFormat: 'minimal',
      omit: {
        user: {
          password: true,
        },
      },
    });
  }

  public async onModuleInit() {
    this.$use(userMiddleware);
    await this.$connect();
  }

  public async onModuleDestroy() {
    console.log('Disconnected from database successfully');
    await this.$disconnect();
  }
}
