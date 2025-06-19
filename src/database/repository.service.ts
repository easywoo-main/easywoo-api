import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { userMiddleware } from './user.middleware';

@Injectable()
export class Repository extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger: Logger = new Logger(this.constructor.name);

  constructor() {
    super({
      errorFormat: 'minimal',
      omit: {
        user: {
          password: true,
        },
        admin: {
          password: true
        }
      },
    });
  }

  public async onModuleInit() {
    this.useMiddleware()
    await this.$connect();
  }

  public useMiddleware(): void {
    this.$use(userMiddleware);
  }

  public async onModuleDestroy() {
    this.logger.log('Disconnected from database successfully');
    await this.$disconnect();
  }
}
