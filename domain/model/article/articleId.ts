import uuid from "uuid/v4";

export default class ArticleId {
  public readonly id: string;

  public constructor(id?: string) {
    this.id = id ? id : uuid();
  }

  public equals(other: string | ArticleId): boolean {
    const otherId = typeof other === "string" ? other : other.id;
    return this.id === otherId;
  }

  public toString(): string {
    return this.id;
  }
}
