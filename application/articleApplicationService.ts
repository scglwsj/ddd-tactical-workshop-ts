import Article from "../domain/model/article/article";
import ArticleId from "../domain/model/article/articleId";
import IArticleRepository from "../domain/model/article/iArticleRepository";

export default class ArticleApplicationService {
  private readonly articleRepository: IArticleRepository;

  public constructor(articleRepository: IArticleRepository) {
    this.articleRepository = articleRepository;
  }

  public createArticle(article: Article): Article {
    return this.articleRepository.save(article);
  }

  public publish(articleId: ArticleId): void {
    const article = this.articleRepository.findById(articleId);
    if (article) {
      article.pulish();
      this.articleRepository.save(article);
    }
  }

  public getArticles(): Article[] {
    return this.articleRepository.findAll();
  }

  public getArticle(articleId: ArticleId): Article | null {
    return this.articleRepository.findById(articleId);
  }
}
