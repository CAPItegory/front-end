import { Injectable } from "@angular/core";
import { Category } from "../entity/category.entity";
import { METHODS } from "node:http";
import { PaginatedCategories } from "../entity/paginated-categories.entity";

@Injectable({
    providedIn: "root"
})
export class CapitegoryService 
{
    private apiUrl : string = "http://localhost:4200/api/category/"; //TODO : env variable

    public async getAll() : Promise<Category[]>
    {
        return await fetch(this.apiUrl)
            .then(res => res.ok ? res.json() : null)
            .then(res => {
                if (res == null) {
                    return null;
                }
                return res
            })
    }

    public async create(name: string, parentId: string|null = null) : Promise<Category | null>
    {
        return await fetch(this.apiUrl, { 
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({name: name, parent: parentId}),
        })
            .then(res => res.ok ? res.json() : null)
            .then(res => {
                if (res == null) {
                    return null;
                }
                return this.toCategory(res)
            })
    }

    public async getById(id: string) : Promise<Category | null>
    {
        return await fetch(this.apiUrl + id)
            .then(res => res.ok ? res.json() : null)
            .then(res => {
                if (res == null) {
                    return null;
                }
                return this.toCategory(res)
            })
    }

    public async update(id: string, name: string|null = null, parentId: string|null = null)
    {
        let query = ""
        if (name == null) {
            query = JSON.stringify({parent: parentId})
        } else {
            query = JSON.stringify({name: name, parent: parentId})
        }
        await fetch(this.apiUrl + id, { 
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: query,
        })
    }

    public async delete(id: string)
    {
        await fetch(this.apiUrl + id, { 
            method: "DELETE",
        })
    }

    public async search(isRoot: boolean|null = null, beforeDate: Date|null = null, afterDate: Date|null = null, parentId: string|null = null, 
        orderByName: boolean|null = null, orderbyCreationDate: boolean|null = null, orderByNumberOfChildren: boolean|null = null, 
        pageNumber: number|null = null, pageSize: number|null = null) : Promise<PaginatedCategories>
    {
        let params = new URLSearchParams()
        if (isRoot != null) {
            params.append("IsRoot", isRoot.valueOf().toString())
        }
        if (beforeDate != null) {
            params.append("BeforeDate", beforeDate.toISOString())
        }
        if (afterDate != null) {
            params.append("AfterDate", afterDate.toISOString())
        }
        if (parentId != null) {
            params.append("ParentId", parentId.valueOf().toString())
        }
        if (orderByName != null) {
            params.append("OrderByName", orderByName.valueOf().toString())
        }
        if (orderbyCreationDate != null) {
            params.append("OrderByCreationDate", orderbyCreationDate.valueOf().toString())
        }
        if (orderByNumberOfChildren != null) {
            params.append("OrderByNumberOfChildren", orderByNumberOfChildren.valueOf().toString())
        }
        if (pageNumber != null) {
            params.append("PageNumber", pageNumber.valueOf().toString())
        }
        if (pageSize != null) {
            params.append("PageSize", pageSize.valueOf().toString())
        }
        return await fetch(this.apiUrl + "search?" + params)
            .then(res => res.ok ? res.json() : null)
            .then(res => {
                if (res == null) {
                    return new PaginatedCategories([], 0, 0, 0);
                }
                let categories = []
                for(let id in res.categories) {
                    categories.push(this.toCategory(res.categories[id]))
                }
                return new PaginatedCategories(categories, res.numberOfPage, res.pageSize, res.pageNumber)
            })
    }

    private toCategory(res: any) : Category {
        return new Category(res.id, res.name, res.creationDate, res.isRoot, res.children)
    }

}