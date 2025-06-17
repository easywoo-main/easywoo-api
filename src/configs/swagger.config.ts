import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder().setTitle('EasyWoo API example').setDescription('The EasyWoo API description').setVersion('1.0').addBearerAuth().build();
