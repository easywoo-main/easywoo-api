import { Seeder } from '../main/seeder.interface';
import { PrismaClient } from '@prisma/client';
import { CreateRoleDto } from '../../../src/modules/role/dtos/create-role.dto';

export class AdminSeed extends Seeder {
  async seed(prisma: PrismaClient): Promise<void> {

    const roles: CreateRoleDto[] = [
      {name: "Super Admin", isEditAdmin: true, isEditChat: true},
      {name: "Admin", isEditAdmin: false, isEditChat: true},
    ]

    for (const role of roles) {
      await prisma.role.upsert({
        where: {name: role.name},
        create: role,
        update: role,
      })
    }
    const admins = [
      {userName: "admin", password: "TRqCXQg9UM65"},
      {userName: "user", password: "KFLfwHp9cm9m"},
      {userName: "George", password: "CEpcgPdyVau4"},
      {userName: "Ester", password: "byqsHYAHrvyJ"},
      {userName: "Rauf", password: "9RhzPEqvWRGd"},
      {userName: "Illia ", password: "8NsCtWjC3g3W"},
      {userName: "Danila", password: "bhWcc7Pwtzbc"},
      {userName: "Volodymyr ", password: "9sBmPdgbsaGk"},
    ]

    for (const admin of admins) {
      await prisma.admin.upsert({
        where: {
          userName: admin.userName
        },
        create: {...admin, role: {connect: {name: roles[0].name}}},
        update: {...admin, role: {connect: {name: roles[0].name}}},
      })
    }
  }
}