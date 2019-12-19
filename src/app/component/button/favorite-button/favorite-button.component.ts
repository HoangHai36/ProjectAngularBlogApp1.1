import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ArticleService } from 'src/app/articleModule/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.css']
})
export class FavoriteButtonComponent implements OnInit {
  @Input() text;
  @Input() article;
  @Output() changeFavorite = new EventEmitter();
  constructor(private articleService: ArticleService, private router: Router) { }

  ngOnInit() {
  }

  onChangeFavorite() {
    if (localStorage.getItem('token')) {
      if (this.article.favorited == false) {
        this.articleService.postFavoriteArticle(this.article.slug).subscribe(data => {
        this.changeFavorite.emit(true);
        })
      } else if (this.article.favorited == true) {
        this.articleService.deleteFavoriteArticle(this.article.slug).subscribe(data => {
         this.changeFavorite.emit(false);
        })
      }
    } else {
      this.router.navigate(['login'])
    }
  }
}
