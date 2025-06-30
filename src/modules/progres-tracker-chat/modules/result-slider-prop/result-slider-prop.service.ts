import { Injectable } from '@nestjs/common';
import { ResultSliderPropRepository } from './result-slider-prop.repository';
import { CreateResultSliderPropDto } from './dtos/createResultSliderProp.dto';
import { ChartFilter } from './dtos/sliderPropsQuery.dto';
import { ChatEntity } from '../../../chat/chat.entity';
import { ChatService } from '../../../chat/chat.service';
import { SliderPropService } from '../../../slider-prop/slider-prop.service';
import { ChartDataDto } from './dtos/chartData.dto';
import { calculateVariable } from './utils/formula.parser';

@Injectable()
export class ResultSliderPropService {
  constructor(private readonly resultSliderPropRepository: ResultSliderPropRepository, private readonly chatService: ChatService, private readonly sliderPropService: SliderPropService) {
  }


  public async createManyResultSliderProp(data: CreateResultSliderPropDto[], userId: string, stepChatMessageId: string) {
    return await this.resultSliderPropRepository.createManyResultSliderProp(data.map((item) => ({ userId, ...item, stepChatMessageId })));
  }

  private async getSliderChartChat(sliderPropsFilterDto: ChartFilter, userId: string): Promise<ChartDataDto[]> {
    const sliderProps = await this.sliderPropService.getAllSliderProps(sliderPropsFilterDto.chatId);

    const filteredSliderProps = (!sliderPropsFilterDto?.variables || sliderPropsFilterDto.variables.length === 0) && !sliderPropsFilterDto.isBarometer
      ? sliderProps
      : sliderProps.filter(sliderProp => sliderPropsFilterDto.variables?.includes(sliderProp.id));
    return Promise.all(filteredSliderProps.map(async sliderProp => {
      const resultSliderProps = await this.resultSliderPropRepository.getResultSliderPropsByUserId({
        userId,
        sliderPropId: sliderProp.id,
        endDate: sliderPropsFilterDto.endDate,
        startDate: sliderPropsFilterDto.startDate
      });
      return {
        name: sliderProp.text,
        variable: sliderProp.name,
        data: resultSliderProps.map(resultSliderProp => ({
          value: Number(resultSliderProp.result), name: resultSliderProp.updatedAt
        }))
      };
    }));

  }

  private async getBarometerChartChat(sliderPropsFilterDto: ChartFilter, userId: string): Promise<ChartDataDto> {
    const chat: ChatEntity = await this.chatService.findChatById(sliderPropsFilterDto.chatId);
    delete sliderPropsFilterDto.isBarometer;
    const userSliderProps = await this.getSliderChartChat(sliderPropsFilterDto, userId);


    let result={};
    for (const sliderProp of userSliderProps){
      for (const point of sliderProp.data) {

        if(!result[point.name]){
          result[point.name] = {}
        }
        result[point.name][sliderProp.name] = point.value;
      }
    }

    return {
      name: chat.masterGraph,
      variable: chat.formula,
      data: Object.entries(result).map(([key, values]: [string, Record<string, number>]) => {
        const date = new Date(key);
        return {
          name: date,
          value: calculateVariable(chat.formula, values)
        };
      })
    };


  }

  public async getResultSliderPropsByUserId(sliderPropsFilterDto: ChartFilter, userId: string) {
    const [barometer, sliderProps] = await Promise.all([this.getBarometerChartChat(sliderPropsFilterDto, userId), this.getSliderChartChat(sliderPropsFilterDto, userId)]);
    sliderProps.push(barometer);
    return sliderProps;
  }


}
