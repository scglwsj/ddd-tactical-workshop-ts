import Product from "./product";

export default class ArticelCreateRequest {
  public title!: string;
  public content!: string;
  public products!: Product[];
}
