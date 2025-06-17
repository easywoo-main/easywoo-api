import { Global, Module } from '@nestjs/common';
import { Repository } from './repository.service';

@Global()
@Module({
  providers: [Repository],
  exports: [Repository],
})
export class DatabaseModule {}
