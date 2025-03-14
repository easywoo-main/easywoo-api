import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from '../configs/swagger.config';

export const swaggerSetup = (app: INestApplication) => {
  const documentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, documentFactory);
};
