import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { globalPipe } from './pipes';
import { globalFilter } from './errorHandler';
import { swaggerSetup } from './utils/swagger.utils';

async function bootstrap() {
  const logger = new Logger();
  const PORT = process.env.PORT || 8080;
  const app = await NestFactory.create(AppModule);

  // Global Prefix
  app.setGlobalPrefix('api/v1', {
    exclude: ['/public/*', '/app/*'],
  });

  // Global Pipes
  app.useGlobalPipes(globalPipe);

  //Global Filter
  app.useGlobalFilters(globalFilter);

  //Swagger
  swaggerSetup(app);

  await app.listen(PORT);
  logger.log(`Application listening on port ${PORT}`);
}
bootstrap();
