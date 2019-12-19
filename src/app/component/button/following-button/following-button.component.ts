import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ArticleService } from 'src/app/articleModule/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-following-button',
  templateUrl: './following-button.component.html',
  styleUrls: ['./following-button.component.css']
})
export class FollowingButtonComponent implements OnInit {
  @Input() dataProfile;
  @Output() changeFollow = new EventEmitter();
  constructor(private articleService: ArticleService, private router: Router) { 
  }

  ngOnInit() {
   
  }

  clickFollowUser() {
    if (localStorage.getItem('token')) {
      if (!this.dataProfile.following) {
        this.articleService.postFollowUser(this.dataProfile.username).subscribe(data => {
          this.changeFollow.emit(true);
        })
      } else {
        this.articleService.deleteFollowUser(this.dataProfile.username).subscribe(data => {
          this.changeFollow.emit(false);
        })
      }
    } else {
      this.router.navigate(['login']);
    }
  }
}
