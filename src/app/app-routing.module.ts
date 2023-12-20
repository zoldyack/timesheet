import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DasbordComponent } from './dasbord/dasbord.component';

const routes: Routes = [  
{
  path: 'sidebar',
  component: SidebarComponent
},
{
  path: 'Dashboard',
  component: DasbordComponent
},
{
  path: 'comp-b',
  component: DasbordComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
