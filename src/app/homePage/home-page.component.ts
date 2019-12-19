import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../articleModule/article.service';
import { AuthService } from '../authModule/auth.service';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Article } from '../shared/article.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  listArticle: Article[];
  listTabs;
  loadingArticle: boolean = true;
  isLogin: boolean;
  toggleTab: boolean = false;
  favorited: boolean;
  tab: number = 2;
  imgNull: string = 'https://static.productionready.io/images/smiley-cyrus.jpg';
  namePopularTag: string = '';
  //pages
  pager: any = {};
  total: number;
  pagedItems: any[];
  constructor(private articleService: ArticleService, private appService: AppService, private authService: AuthService, private router: Router) {
    this.isLogin = localStorage.getItem('token') ? true : false;
  }

  ngOnInit() {
    this.setPage(1);
    this.articleService.getTabs().subscribe(data => {
      this.listTabs = data['tags'];
    })
  }

  clickYourFeed() {
    this.tab = 1;
    this.toggleTab = false;
    this.setPage(1);
  }

  clickGlobalFeed() {
    this.tab = 2;
    this.toggleTab = false;
    this.setPage(1);
  }

  clickPopularTags(nameTab) {
    this.namePopularTag = nameTab;
    this.tab = 3;
    this.toggleTab = true;
    this.setPage(1);
  }

  setPage(page) {
    this.loadingArticle = true;
    this.listArticle = [];
    let offSetPage = (page - 1) * 10;
    if (page < 1 || page > this.pager.totalPages) {
      offSetPage = 0;
    }
    switch (this.tab) {
      case 1:
        this.articleService.getYourArticle(offSetPage).subscribe((data) => {
          this.listArticle = data['articles'];
          this.loadingArticle = false;
          this.total = data['articlesCount'];
          this.pager = this.appService.getPager(this.total, page, 10);
        });
        break;
      case 2:
        this.articleService.getGlobalArticle(this.isLogin, offSetPage).subscribe(data => {
          this.listArticle = data['articles'];
          this.loadingArticle = false;
          this.total = data['articlesCount'];
          this.pager = this.appService.getPager(this.total, page, 10);
        });
        break;
      case 3:
        this.articleService.getTabArticle(this.namePopularTag, this.isLogin, offSetPage).subscribe((data) => {
          this.listArticle = data['articles'];
          this.loadingArticle = false;
          this.total = data['articlesCount'];
          this.pager = this.appService.getPager(this.total, page, 10);
        });
        break;
    }
  }
}
