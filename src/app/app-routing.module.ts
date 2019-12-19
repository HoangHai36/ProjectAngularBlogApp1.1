import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomePageComponent } from './homePage/home-page.component';



const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'profile', loadChildren: './userModule/user.module#UserModule'},
  { path: 'article', loadChildren: './articleModule/article.module#ArticleModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
