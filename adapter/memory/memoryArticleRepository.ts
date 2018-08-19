import Article from "../../domain/model/article/article";
import ArticleId from "../../domain/model/article/articleId";
import IArticleRepository from "../../domain/model/article/iArticleRepository";

export default class MemoryArticleRepository implements IArticleRepository {
  private readonly articles: { [key: string]: Article };

  public constructor() {
    this.articles = {};
  }

  public save(article: Article): Article {
    this.articles[article.id.toString()] = article;
    return article;
  }

  public findById(articleId: ArticleId): Article | null {
    return this.articles[articleId.toString()];
  }
  public findAll(): Article[] {
    return Object.values(this.articles);
  }
}
