import { Injectable } from "@angular/core";
import { Category } from "../entity/category.entity";

@Injectable({
    providedIn: "root"
})
export class CapitegoryService 
{
    private apiUrl : string = "http://localhost:4200/api/category"; //TODO : env variable

    public async getById(id: string) : Promise<Category | null>
    {
        return await fetch(this.apiUrl + "/" + id)
            .then(res => res.ok ? res.json() : null)
            .then(res => {
                if (res == null) {
                    return null;
                }
                return new Category(res.id, res.name, res.creationDate, res.isRoot, res.children)
            })
    }
}