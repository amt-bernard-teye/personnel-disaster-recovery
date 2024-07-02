import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from "morgan";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(morgan("tiny"));

  app.setGlobalPrefix("api");
  app.enableCors();
  
  const config = new DocumentBuilder()
    .setTitle("Personnel Disaster Recovery Api")
    .setDescription("A system to create a prioritized list of professionals whose skills can sustain normal/regular operations when disaster strikes.")
    .addServer("http://localhost:3000", "local server")
    .addServer("http://localhost:3000", "online server")
    .setVersion("1.0.0")
    .addTag("Auth")
    .addTag("Users")
    .addTag("Seeders")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);

  await app.listen(3000);
}
bootstrap();
