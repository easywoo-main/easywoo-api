import { PrismaClient } from '@prisma/client';
import { ConsoleLogger, Logger } from '@nestjs/common';

export abstract class Seeder {
  protected abstract seed(prisma: PrismaClient): Promise<void>;
  logger: Logger = new Logger(this.constructor.name, { timestamp: true });

  async run(prisma: PrismaClient): Promise<void> {
    await this.seed(prisma)
      .catch((e)=>console.log(e))
      .then(() => this.logger.log(`Seeding of ${this.constructor.name} completed`));
  }
}
