import { Category } from "./category.entity";

export class PaginatedCategories
{
    public categories: Category[];
    public numberOfPage: number;
    public pageSize: number;
    public pageNumber: number;

    public constructor(categories: Category[], numberOfPage: number, pageSize: number, pageNumber: number)
    {
        this.categories = categories;
        this.numberOfPage = numberOfPage;
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
    }
}