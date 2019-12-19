import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit {
  @Input() tab;
  @Input() listArticle;
  @Output() unFavorite = new EventEmitter(); 
  constructor() { }

  ngOnInit() {
  }

  emitChangeFavorite(favorited, index) {
    this.listArticle[index]['favorited'] = favorited;
    if (favorited) {
      this.listArticle[index]['favoritesCount']++;
    } else {
      if (this.tab == 2) {
        this.unFavorite.emit();
      }
      this.listArticle[index]['favoritesCount']--;
    }
  }
}
