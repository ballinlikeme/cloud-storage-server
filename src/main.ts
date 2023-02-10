import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./application.module";
import { ValidationPipe } from "@nestjs/common";

const start = async () => {
  const PORT = process.env.PORT || 7000;

  const app = await NestFactory.create(ApplicationModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false,
    })
  );
  await app.listen(5000, () => console.log("Server started on port " + PORT));
};

start();
