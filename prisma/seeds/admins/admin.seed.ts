import { Seeder } from '../main/seeder.interface';
import { PrismaClient } from '@prisma/client';

export class AdminSeed extends Seeder {
  async seed(prisma: PrismaClient): Promise<void> {
    const admins =[
      {userName: "admin", password: "TRqCXQg9UM65"},
      {userName: "user", password: "KFLfwHp9cm9m"},
      {userName: "George", password: "CEpcgPdyVau4"},
      {userName: "Ester", password: "byqsHYAHrvyJ"},
      {userName: "Rauf", password: "9RhzPEqvWRGd"},
      {userName: "Danila", password: "Sf8TQXQ5WDFg"},
      {userName: "Illia ", password: "8NsCtWjC3g3W"},
      {userName: "Danila", password: "bhWcc7Pwtzbc"},
      {userName: "Volodymyr ", password: "9sBmPdgbsaGk"},
    ]

    for (const admin of admins) {
      await prisma.admin.upsert({
        where: {
          userName: admin.userName
        },
        create: admin,
        update: admin,
      })
    }
  }
}