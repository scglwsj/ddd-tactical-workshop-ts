import ArticleApplicationService from "../application/articleApplicationService";
import Article from "../domain/model/article/article";
import IArticleRepository from "../domain/model/article/iArticleRepository";

class MockArticleRepository implements IArticleRepository {
  public save = jest.fn().mockReturnValue("id");
  public findById = jest.fn().mockReturnValue(null);
  public findAll = jest.fn().mockReturnValue([]);
}

const mockRepository = new MockArticleRepository();
const service = new ArticleApplicationService(mockRepository);

test("it should save an object when create an article", () => {
  service.createArticle(new Article("title", "content"));
  expect(mockRepository.save.mockImplementationOnce);
});
