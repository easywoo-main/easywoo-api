import { Injectable } from '@nestjs/common';
import { UserPayload } from './payloads/userPayload.interface';
import { UserEntity } from '../user/user.entity';
import { AdminEntity } from '../admin/admin.entity';
import { AdminPayload } from './payloads/adminPayload.interface';
import { PasswordResetPayload } from './payloads/passwordResetPayload.interface';

@Injectable()
export class PayloadMapper {

  public userEntityToUserPayload(userEntity: UserEntity): UserPayload {
    return {
      id: userEntity.id,
      email: userEntity.email,
      isVerified: userEntity.isVerified,
    };
  }

  public adminEntityToAdminPayload(adminEntity: AdminEntity): AdminPayload {
    return {
      id: adminEntity.id,
      userName: adminEntity.userName,
      roleId: adminEntity.roleId,
    }
  }

  public userEntityToPasswordResetPayload(userEntity: UserEntity): PasswordResetPayload {
    return{
      id: userEntity.id,
      email: userEntity.email,
    };
  }

}