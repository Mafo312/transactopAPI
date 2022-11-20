import { DatabaseModule } from './../database/database.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const entiy = await NestFactory.create(DatabaseModule)
  
  app.enableCors(
    {origin: "*"}
  )

  const config = new DocumentBuilder()
  .setTitle('TRANSACTION TRACKING API')
  .setDescription('Transaction tracking system')
  .setVersion('1.0')
  .addTag('Transaction')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

await app.listen(8001);

}
bootstrap(); 
 