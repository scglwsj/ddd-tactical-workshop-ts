import MemoryArticleRepository from "../adapter/memory/memoryArticleRepository";
import Article from "../domain/model/article/article";
import ArticleApplicationService from "./../Application/ArticleApplicationService";

const service = new ArticleApplicationService(new MemoryArticleRepository());

const article = service.createArticle(new Article("文章标题", "文章内容"));
service.publish(article.id);

const articles = service.getArticles();
console.log(`rticles size is ${articles.length}`);
console.log(`Id is ${articles[0].id.toString()} and Status is ${articles[0].status.toString()}`);
