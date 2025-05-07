import { Injectable } from '@nestjs/common';
import { InfoPopUpRepository } from './info-pop-up.repository';
import { CreateUpdateInfoPopupDto } from './dtos/createUpdateInfoPopup.dto';
import { CheckExists } from '../../decorators';
import { InfoPopUpEntity } from './info-pop-up.entity';

@Injectable()
export class InfoPopUpService {
  constructor(private readonly infoPopUpRepository: InfoPopUpRepository) {}

  public async createInfoPopUp(data: CreateUpdateInfoPopupDto) {
    return this.infoPopUpRepository.createInfoPopUp(data);
  }

  @CheckExists("Info pop-up not found")
  public async findInfoPopUpById(id: string): Promise<InfoPopUpEntity> {
    return this.infoPopUpRepository.findInfoPopUpById(id);
  }

  public async findAllInfoPopUpsByChatMessageId(chatMessageId: string) {
    return this.infoPopUpRepository.findAllInfoPopUpsByChatMessageId(chatMessageId);
  }

  public async updateInfoPopUp(id: string, data: Partial<CreateUpdateInfoPopupDto>) {
    return this.infoPopUpRepository.updateInfoPopUp(id, data);
  }

  public async deleteInfoPopUp(id: string) {
    return this.infoPopUpRepository.deleteInfoPopUp(id);
  }

  public async bulkUpsertPopUp(chatMessageId: string, infoPopUps: CreateUpdateInfoPopupDto[]) {
    return Promise.all(
      infoPopUps.map((messageSlider)=>{
        if(!messageSlider.id){
          return this.createInfoPopUp({...messageSlider, chatMessageId})
        }
        return this.updateInfoPopUp(messageSlider.id, {...messageSlider, chatMessageId})
      })
    )
  }
}