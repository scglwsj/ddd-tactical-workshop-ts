import ArticleId from "./articleId";
import ArticleStatus from "./articleStatus";
import Product from "./product";

export default class Article {
  public id: ArticleId;
  public readonly title: string;
  public readonly content: string;
  public readonly products: Product[];
  private pStatus: ArticleStatus;
  public get status(): ArticleStatus { return this.pStatus; }

  public constructor(title: string, content: string) {
    this.id = new ArticleId();
    this.products = [];
    this.pStatus = ArticleStatus.Draft;

    this.title = title;
    this.content = content;
  }

  public pulish(): void {
    this.pStatus = ArticleStatus.Published;
  }

  public addProduct(prouct: Product): void {
    this.products.push(prouct);
  }
}
