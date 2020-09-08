import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginSuccesComponent } from './login-succes/login-succes.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { AdminpanalComponent } from './adminpanal/adminpanal.component';


const routes: Routes = [
// {path:'' ,component : LoginComponent},
{path :'Auth',component : LoginSuccesComponent,children:[
  {path:'' ,component : LoginComponent},
]},
{path : 'home',component:HomepageComponent,children:[
  {path:"main",component:MainPageComponent},
  {path:"home",redirectTo:"main",pathMatch:'full'},
]},
{path:"adminlogin",component:AdminloginComponent},
{path:"adminpanal",component:AdminpanalComponent},

{path:'',redirectTo:'Auth',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
