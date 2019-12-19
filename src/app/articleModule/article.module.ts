import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ArticlePageComponent } from './article-page/article-page.component';
import { EditorArticleComponent } from './editor-article/editor-article.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommentArticleComponent } from './comment-article/comment-article.component';
import { AuthGuard } from '../auth.guard';
import { AngularEditorModule } from '@kolkov/angular-editor';


const articleRoutes: Routes = [
  {
    path: '', children: [
      { path: ':slug', component: ArticlePageComponent },
      { path: 'new/editor',canActivate: [AuthGuard], component: EditorArticleComponent },
      { path: 'editor/:slug',canActivate: [AuthGuard], component: EditorArticleComponent }
    ]
  }
];

@NgModule({
  declarations: [
    ArticlePageComponent,
    EditorArticleComponent,
    CommentArticleComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule,
    RouterModule.forChild(articleRoutes)
  ]
})
export class ArticleModule { }
