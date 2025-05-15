import { Injectable } from '@nestjs/common';
import { Repository } from '../../../../database/repository.service';
import { Prisma } from '.prisma/client';

@Injectable()
export class CarePlanRepository {
  constructor(repository: Repository) {
  }
}
