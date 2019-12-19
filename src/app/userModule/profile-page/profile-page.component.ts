import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/articleModule/article.service';
import { UserService } from '../user.service';
import { AppService } from 'src/app/app.service';
import { Profile } from '../../shared/profile.interface';
import { Article} from '../../shared/article.interface';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  check: boolean = false;
  loadingArticle: boolean = true;
  isLogin: boolean = false;
  imgNull: string = 'https://static.productionready.io/images/smiley-cyrus.jpg';
  name: string;
  listArticle: Article[];
  dataProfile: Profile;
  tab: number = 1;
  page: number = 0;
  // phan trang
  total1: number;
  total2: number;
  pager: any = {};
  pagedItems: any[];
  constructor(private route: ActivatedRoute,
    private articleService: ArticleService,
    private userService: UserService,
    private appService: AppService
    ) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      if (param.username == localStorage.getItem('name')) {
        this.check = true;
      } else {
        this.check = false;
      }
      this.name = param.username;
      this.userService.getProfile(this.name).subscribe(data => {
        this.dataProfile = data['profile'];
      })
      this.setPage(1);
    })
  }

  clickFavoritedArticle() {
    this.tab = 2;
    this.setPage(1);
  }

  clickMyArticle() {
    this.tab = 1;
    this.setPage(1);
  }

  onChangeFollow(following: boolean):void {
    this.dataProfile.following = following;
  }

  deleteArticleFavorite():void {
    this.setPage(1);
  }

  setPage(page: number):void {
    this.isLogin = localStorage.getItem('token') ? true : false;
    this.loadingArticle = true;
    let offSetPage = (page - 1) * 5;
    if (page < 1 || page > this.pager.totalPages) {
       offSetPage = 0;
    }
    switch (this.tab) {
      case 1:
        this.articleService.getMyArticle(this.name, this.isLogin, offSetPage, '5').subscribe((data) => {
          this.loadingArticle = false;
          this.listArticle = data['articles'];
          this.total1 = data['articlesCount'];
          this.pager = this.appService.getPager(this.total1, page, 5);
        });
        break;
      case 2:
        this.articleService.getYourArticlefavorite(this.name, this.isLogin, offSetPage).subscribe(data => {
          this.listArticle = data['articles'];
          this.loadingArticle = false;
          this.total2 = data['articlesCount'];
          this.pager = this.appService.getPager(this.total2, page, 5);
        });
        break;
    }
  }
}
