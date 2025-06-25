import { Injectable } from '@nestjs/common';
import { UserPayload } from './payloads/userPayload.interface';
import { UserEntity } from '../user/user.entity';
import { AdminEntity } from '../admin/admin.entity';
import { AdminPayload } from './payloads/adminPayload.interface';
import { PasswordResetPayload } from './payloads/passwordResetPayload.interface';
import { ResetPassword } from '../user/dto/resetPassword.dto';
import { PasswordResetEntity } from '../password-reset/password-reset.entity';

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

  public resetPasswordToPasswordResetPayload(resetPassword: PasswordResetEntity): PasswordResetPayload {
    return{
      id: resetPassword.userId,
      resetPasswordId: resetPassword.id,
    };
  }

}