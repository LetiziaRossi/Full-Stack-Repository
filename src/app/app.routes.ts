import { Routes } from '@angular/router';
import { IndexComponent } from './module/book/index/index.component';
import { CreateComponent } from './module/book/create/create.component';
import { EditComponent } from './module/book/edit/edit.component';

export const routes: Routes = [
    { path: 'book', redirectTo: 'book/index', pathMatch: 'full'},
    { path: 'book/index', component: IndexComponent },
    { path: 'book/create', component: CreateComponent },
    { path: 'book/:isbn/edit', component: EditComponent } 
];
