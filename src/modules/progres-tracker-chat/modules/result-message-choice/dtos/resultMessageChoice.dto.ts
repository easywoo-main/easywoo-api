import { ResultMessageChoiceEntity } from '../result-message-choice.entity';
import { UserEntity } from '../../../../user/user.entity';


export class  ResultMessageChoiceDto extends ResultMessageChoiceEntity {
  user: UserEntity;

}