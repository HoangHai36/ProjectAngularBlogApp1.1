import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from '../article.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../../shared/comment.interface';

@Component({
  selector: 'app-comment-article',
  templateUrl: './comment-article.component.html',
  styleUrls: ['./comment-article.component.css']
})
export class CommentArticleComponent implements OnInit {
  isLogin: boolean;
  listComment: Comment[];
  textBody: string = '';
  slug: string;
  img: string;
  nameUserIslogin: string;
  imgNull: string = 'https://static.productionready.io/images/smiley-cyrus.jpg';
  constructor(private articleService: ArticleService, private route: ActivatedRoute) {
    if (localStorage.getItem('token')) {
      this.isLogin = true;
      this.nameUserIslogin = localStorage.getItem('name');
    } else {
      this.isLogin = false;
    }
    this.route.params.subscribe(param => {
      this.slug = param['slug'];
      this.img = localStorage.getItem('image');
      this.articleService.getCommentArticle(this.slug).subscribe(data => {
        this.listComment = data['comments']
      })
    })

  }

  ngOnInit() {
  }

  //comment
  postNewComment(): void {
    if (localStorage.getItem('token')) {
      this.articleService.postCommentArticle(this.slug, { 'body': this.textBody }).subscribe(data => {
        this.listComment.unshift(data['comment'])
      })
    } else {
      this.isLogin = false;
    }
    this.textBody = "";
  }

  deleteComment(id, index): void {
    if (this.isLogin) {
      this.articleService.deleteCommentArticle(this.slug, id).subscribe(data => {
        this.listComment.splice(index, 1);
      })
    }
  }
}
