import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';

export const routes: Routes = [
    { path : '', component: HomeComponent },
    { path : 'category', component: CategoryComponent }
];
