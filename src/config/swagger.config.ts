// move swagger config to here
import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
    .setTitle('Zurich Motor Insurance API')
    .setDescription('The urich Motor Insurance API description')
    .setVersion('1.0')
    .addTag('Motor Insurance')
    .build();