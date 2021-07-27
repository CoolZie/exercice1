import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './pages/users/users.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
const routes: Routes = [
  { path: '', component: UsersComponent },
  { path: 'users', component: UsersComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: '**', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
