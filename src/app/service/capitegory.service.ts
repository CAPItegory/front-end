import { Injectable } from "@angular/core";
import { Category } from "../entity/category.entity";
import { PaginatedCategories } from "../entity/paginated-categories.entity";
import { environment } from "../../environments/environment";
import { ServerError } from "../exceptions/server.exception";
import { HttpStatusCode } from "@angular/common/http";
import { BadRequestError } from "../exceptions/bad-request.exception";

@Injectable({
    providedIn: "root"
})
export class CapitegoryService 
{
    private apiUrl : string = environment.apiUrl;

    public async getAll() : Promise<Category[]>
    {
        return await fetch(this.apiUrl)
            .then(res => res.ok ? res.json() : null)
            .then(res => {
                if (res == null) {
                    throw new ServerError("Invalid response")
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
            .then(async res => {
                if(!res.ok) {
                    switch(res.status) {
                        case HttpStatusCode.BadRequest : throw new BadRequestError(await res.text()) 
                        case HttpStatusCode.InternalServerError : throw new ServerError(await res.text())
                    }
                }
                return res
            })
            .then(res => res.ok ? res.json() : null)
            .then(res => {
                if (res == null) {
                    throw new ServerError("Invalid response")
                }
                return this.toCategory(res)
            })
    }

    public async getById(id: string) : Promise<Category | null>
    {
        return await fetch(this.apiUrl + id)
            .then(async res => {
                if(!res.ok) {
                    switch(res.status) {
                        case HttpStatusCode.NotFound : throw new BadRequestError(await res.text())
                        case HttpStatusCode.InternalServerError : throw new ServerError(await res.text())
                    }
                }
                return res
            })
            .then(res => res.ok ? res.json() : null)
            .then(res => {
                if (res == null) {
                    throw new ServerError("Invalid response")
                }
                return this.toCategory(res)
            })
    }

    public async update(id: string, name: string|null = null, parentId: string|null = null)
    {
        var query : {
            [key: string]: unknown;
          } = {}
        if (name != null) {
            query['name'] = name;
        }
        if (parentId != null) {
            query['parent'] = parentId == "" ? null : parentId
        }
        await fetch(this.apiUrl + id, { 
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(query),
        })
            .then(async res => {
                if(!res.ok) {
                    switch(res.status) {
                        case HttpStatusCode.BadRequest : throw new BadRequestError(await res.text())
                        case HttpStatusCode.InternalServerError : throw new ServerError(await res.text())
                    }
                }
            })
    }

    public async delete(id: string)
    {
        await fetch(this.apiUrl + id, { 
            method: "DELETE",
        })
            .then(async res => {
                if(!res.ok) {
                    switch(res.status) {
                        case HttpStatusCode.NotFound : throw new BadRequestError(await res.text())
                        case HttpStatusCode.InternalServerError : throw new ServerError(await res.text())
                    }
                }
                return res
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
            params.append("OrderByNumberOfChild", orderByNumberOfChildren.valueOf().toString())
        }
        if (pageNumber != null) {
            params.append("PageNumber", pageNumber.valueOf().toString())
        }
        if (pageSize != null) {
            params.append("PageSize", pageSize.valueOf().toString())
        }
        return await fetch(this.apiUrl + "search?" + params)
            .then(async res => {
                if(!res.ok) {
                    switch(res.status) {
                        case HttpStatusCode.InternalServerError : throw new ServerError(await res.text())
                    }
                }
                return res
            })
            .then(res => res.ok ? res.json() : null)
            .then(res => {
                if (res == null) {
                    return new PaginatedCategories([], 0, 0, 0);
                }
                let categories = []
                for(let id in res.categories) {
                    categories.push(this.toCategory(res.categories[id]))
                }
                return new PaginatedCategories(categories, res.totalPages, res.pageSize, res.pageNumber)
            })
    }

    private toCategory(res: any) : Category {
        return new Category(res.id, res.name, res.creationDate, res.isRoot, res.children)
    }

}