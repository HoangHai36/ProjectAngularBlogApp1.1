import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppService } from '../app.service';
import { AuthService } from '../authModule/auth.service';
import { ListArticleComponent } from '../component/listArticle/list-article.component';
import { PaginationComponent } from '../component/pagination/pagination.component';
import { Routes, RouterModule } from '@angular/router';
import { FollowingButtonComponent } from '../component/button/following-button/following-button.component';
import { FavoriteButtonComponent } from '../component/button/favorite-button/favorite-button.component';


@NgModule({
  declarations: [
    ListArticleComponent,
    PaginationComponent,
    FollowingButtonComponent,
    FavoriteButtonComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ], 
  exports: [
    ListArticleComponent,
    PaginationComponent,
    FollowingButtonComponent,
    FavoriteButtonComponent,
  ]
})
export class SharedModule { 
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [  AuthService, AppService ]
    };
  }
}
