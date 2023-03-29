export class CreateCatDto {
    readonly name: string;
    readonly age: number;
    readonly bread: string;
  }

export class ListAllEntities {
    public limit: string;
}
export class UpdateCatDto {
}
export class event {
  readonly id: number;
  readonly title: string;
  readonly descript: string;
  readonly address: number;
  readonly paynum: number;
  readonly finished: number;
  readonly e_type: number;
  readonly owner: number;
  readonly solver: number;
  readonly paytype: number;
}