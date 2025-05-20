import { Injectable } from '@nestjs/common';
import { PageRequest } from '../../utils/page-request.utils';
import { PageResponse } from 'src/utils/page-response.utils';

@Injectable()
export class PaintPointService {
  public async getAllPaintPoints(pageRequest: PageRequest) {
    return new PageResponse(pageRequest, [{id: "1", paintPoints: "1"}, {id: "12", paintPoints: "3"}, {id: "123", paintPoints: "a"}, {id: "16", paintPoints: "43"}], 1)
  }
}
