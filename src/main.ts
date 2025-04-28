import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { globalPipe } from './pipes';
import { globalFilter } from './errorHandler';
import { swaggerSetup } from './utils/swagger.utils';
import { getAbsolutePublicPath } from './utils/storage.utils';

async function bootstrap() {
  const logger = new Logger(NestApplication.name);
  const PORT = process.env.PORT || 8080;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //Cors
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  // Global Prefix
  app.setGlobalPrefix('api/v1', {
    exclude: ['/public', '/app'],
  });

  // Static Assets
  app.useStaticAssets(getAbsolutePublicPath(), {
    prefix: '/public',
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
