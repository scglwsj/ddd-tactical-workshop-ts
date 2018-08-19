import Article from "./article";
import ArticleId from "./articleId";

export default interface IArticleRepository {
  save(article: Article): Article;
  findById(articleId: ArticleId): Article | null;
  findAll(): Article[];
}
