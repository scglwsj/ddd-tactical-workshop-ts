export default class Product {
  public readonly name: string;
  public readonly code: string;

  public constructor(name: string, code: string) {
    this.name = name;
    this.code = code;
  }
}
