import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateUpdateInfoPopupDto } from './dtos/createUpdateInfoPopup.dto';
import { InfoPopUpEntity } from './info-pop-up.entity';

@Injectable()
export class InfoPopUpRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async createInfoPopUp(data: CreateUpdateInfoPopupDto): Promise<InfoPopUpEntity> {
    return this.prisma.infoPopUp.create({ data });
  }

  public async findInfoPopUpById(id: string): Promise<InfoPopUpEntity> {
    return this.prisma.infoPopUp.findUnique({ where: { id } });
  }

  public async findAllInfoPopUpsByChatMessageId(chatMessageId: string): Promise<InfoPopUpEntity[]> {
    return this.prisma.infoPopUp.findMany({where: { chatMessageId }});
  }

  public async updateInfoPopUp(id: string, data: Partial<CreateUpdateInfoPopupDto>): Promise<InfoPopUpEntity> {
    return this.prisma.infoPopUp.update({ where: { id }, data });
  }

  public async deleteInfoPopUp(id: string): Promise<InfoPopUpEntity> {
    return this.prisma.infoPopUp.delete({ where: { id } });
  }

}
