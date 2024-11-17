import { Category } from "./category.entity";

export class PaginatedCategories
{
    public categories: Category[];
    public totalPages: number;
    public pageSize: number;
    public pageNumber: number;

    public constructor(categories: Category[], totalPages: number, pageSize: number, pageNumber: number)
    {
        this.categories = categories;
        this.totalPages = totalPages;
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
    }
}