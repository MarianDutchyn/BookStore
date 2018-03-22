import {NgModule} from '@angular/core';
import {HomeComponent} from './components/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {MyAccountComponent} from './components/my-account/my-account.component';


const appRoutes: Routes = [
  {
    path : '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'myAccount',
    component: MyAccountComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
