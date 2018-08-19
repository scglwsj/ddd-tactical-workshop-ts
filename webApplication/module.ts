import { Module } from "@nestjs/common";
import { ArticleController } from "./controller";

@Module({
  controllers: [ArticleController],
  imports: [],
  providers: [],
})
export class AppModule {}
