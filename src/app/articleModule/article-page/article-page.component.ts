import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../shared/article.interface';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent implements OnInit {
  article: Article;
  check: boolean;
  textBody: string = '';
  img: string;
  slug: string;
  imgNull: string = 'https://static.productionready.io/images/smiley-cyrus.jpg';
  constructor(private articleService: ArticleService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(param => {
      this.img = localStorage.getItem('image');
      this.slug = param['slug'];
      this.articleService.getArticleDetail(param.slug).subscribe(article => {
        if (article['article'].author.username == localStorage.getItem('name')) {
          this.check = true;
        } else {
          this.check = false;
        }
        this.article = article['article'];
      })
    })
  }

  ngOnInit() {
  }

  onChangeFollow(following) {
    this.article.author.following = following;
  }

  emitChangeFavorite(favorited) {
    this.article['favorited'] = favorited;
    if (favorited) {
      this.article['favoritesCount']++;
    } else {
      this.article['favoritesCount']--;
    }
  }

  deleteArticle() {
    if (this.check) {
      this.articleService.deleteArticle(this.slug).subscribe(data => {
      })
      this.router.navigate(['/profile/', localStorage.getItem('name')])
    }
  }
}
