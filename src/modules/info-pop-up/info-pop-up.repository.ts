import { Injectable } from '@nestjs/common';
import { Repository } from '../../database/repository.service';
import { CreateUpdateInfoPopupDto } from './dtos/createUpdateInfoPopup.dto';
import { InfoPopUpEntity } from './info-pop-up.entity';
import { Prisma } from '.prisma/client';

@Injectable()
export class InfoPopUpRepository {
  private readonly  infoPopUpRepository: Prisma.InfoPopUpDelegate;
  constructor(repository: Repository) {
    this.infoPopUpRepository = repository.infoPopUp
  }

  public async createInfoPopUp(data: CreateUpdateInfoPopupDto): Promise<InfoPopUpEntity> {
    return this.infoPopUpRepository.create({ data });
  }

  public async findInfoPopUpById(id: string): Promise<InfoPopUpEntity> {
    return this.infoPopUpRepository.findUnique({ where: { id } });
  }

  public async findAllInfoPopUpsByChatMessageId(chatMessageId: string): Promise<InfoPopUpEntity[]> {
    return this.infoPopUpRepository.findMany({where: { chatMessageId }});
  }

  public async updateInfoPopUp(id: string, data: Partial<CreateUpdateInfoPopupDto>): Promise<InfoPopUpEntity> {
    return this.infoPopUpRepository.update({ where: { id }, data });
  }

  public async deleteInfoPopUp(id: string): Promise<InfoPopUpEntity> {
    return this.infoPopUpRepository.delete({ where: { id } });
  }

}
