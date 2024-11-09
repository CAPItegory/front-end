import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { CreateCategoryComponent } from './create-category/create-category.component';

export const routes: Routes = [
    { path : '', component: HomeComponent },
    { path : 'list', component: ListCategoryComponent},
    { path : 'list/:id', component: ListCategoryComponent},
    { path : 'create', component: CreateCategoryComponent}
];
