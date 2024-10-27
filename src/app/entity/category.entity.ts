import { UUID } from "crypto";

export class Category
{
    public id: UUID;
    public name: string;
    public creationDate: Date;
    public isRoot: boolean;
    public children: Category[];

    public constructor(id:UUID, name:string, creationDate:Date, isRoot:boolean, children:Category[])
    {
        this.id = id;
        this.name = name;
        this.creationDate = creationDate;
        this.isRoot = isRoot;
        this.children = children;
    }
}