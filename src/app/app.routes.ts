import { Routes } from '@angular/router';
import { BookComponent } from './pages/book/book.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'book/:id', title:'Book Details', component: BookComponent },
];
