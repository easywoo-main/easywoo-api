import { PrismaClient } from '@prisma/client';
import { Seeder } from '../main/seeder.interface';

export class UserSeed extends Seeder {
  async seed(prisma: PrismaClient): Promise<void> {
    const users = [
      {
        email: 'test@gmail.com',
        password: 'Test123!',
        name: 'Test User',
        isVerified: false,
        hasQuizCompleted: false,
      },
      {
        email: 'test1@gmail.com',
        password: 'Test123!',
        name: 'Test User 1',
        isVerified: true,
        hasQuizCompleted: false,
      },
    ];

    for (const user of users) {
      await prisma.user.upsert({
        where: { email: user.email },
        update: user,
        create: user,
      });
    }
  }
}
