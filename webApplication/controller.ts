import { Body, Controller, Get, HttpStatus, Param, Post, Response } from "@nestjs/common";
import MemoryArticleRepository from "../adapter/memory/memoryArticleRepository";
import ArticleApplicationService from "../application/articleApplicationService";
import Article from "../domain/model/article/article";
import ArticleId from "../domain/model/article/articleId";
import ArticleStatus from "../domain/model/article/articleStatus";
import DomainProduct from "../domain/model/article/product";
import ArticelCreateRequest from "./model/articelCreateRequest";
import ArticelResopse from "./model/articelResopse";
import Product from "./model/product";

@Controller("api/articles")
export class ArticleController {
  private readonly service: ArticleApplicationService;

  public constructor() {
    this.service = new ArticleApplicationService(new MemoryArticleRepository());
  }

  @Get()
  public getAll(): ArticelResopse[] {
    return this.service
      .getArticles()
      .map(this.convertDomaiModelToArticelRequestModel);
  }

  @Get(":id")
  // tslint:disable-next-line:max-line-length
  public getById(
    @Param() { id }: { id: string },
    @Response() response: { status: (code: HttpStatus) => { send: () => void } },
  ): ArticelResopse | void {
    const article = this.service.getArticle(new ArticleId(id));
    if (article) {
      return this.convertDomaiModelToArticelRequestModel(article);
    } else {
      response.status(HttpStatus.NOT_FOUND).send();
    }
  }

  @Post()
  public create(@Body() dto: ArticelCreateRequest): string {
    return this.service
      .createArticle(this.convertArticelRequestModelToDomaiModel(dto))
      .toString();
  }

  @Post(":id/pulishtask")
  public pulish(@Param() { id }: { id: string }): void {
    this.service.publish(new ArticleId(id));
  }

  private convertArticelRequestModelToDomaiModel(
    dto: ArticelCreateRequest,
  ): Article {
    const article = new Article(dto.title, dto.content);
    dto.products.forEach((p) =>
      article.addProduct(this.convertProductRequestModelToDomaiModel(p)),
    );
    return article;
  }

  private convertProductRequestModelToDomaiModel(dot: Product): DomainProduct {
    return new DomainProduct(dot.name, dot.code);
  }

  private convertDomaiModelToArticelRequestModel(
    domain: Article,
  ): ArticelResopse {
    const result = new ArticelResopse();
    result.content = domain.content;
    result.id = domain.id.toString();
    result.products = domain.products.map((p) => {
      const rp = new Product();
      rp.code = p.code;
      rp.name = p.name;
      return rp;
    });
    result.status = ArticleStatus[domain.status];
    result.title = domain.title;
    return result;
  }
}
