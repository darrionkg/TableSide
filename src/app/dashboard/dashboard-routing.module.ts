import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { MenuEditComponent } from './menu-edit/menu-edit.component';

const dashRoutes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'add', component: AddCategoryComponent },
          { path: 'menuEdit/:category', component: MenuEditComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
