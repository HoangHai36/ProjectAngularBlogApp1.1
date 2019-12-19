import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ArticleService } from '../article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Article } from '../../shared/article.interface';

@Component({
  selector: 'app-editor-article',
  templateUrl: './editor-article.component.html',
  styleUrls: ['./editor-article.component.css']
})
export class EditorArticleComponent implements OnInit {
  check: boolean = false;
  formArticle: FormGroup;
  newArticle: Article;
  tagList: Array<string> = [];
  errNewArticle: Array<string>;
  slug: string;
  constructor(private articleService: ArticleService, private appService: AppService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    this.formArticle = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      body: ['', Validators.required],
    })
    this.route.params.subscribe(param => {
      if (param['slug']) {
        this.check = true;
        this.slug = param['slug'];
        this.articleService.getArticleDetail(param['slug']).subscribe(data => {
          this.formArticle = fb.group({
            title: [data['article'].title, Validators.required],
            description: [data['article'].description, Validators.required],
            body: [data['article'].body, Validators.required],
          });
          this.tagList = data['article'].tagList;
        })
      }
    })
  }

  ngOnInit() {
  }

  pushTab(event: Event) {
    event.stopPropagation();
    if (event.target['value'] !== '') {
      this.tagList.push(event.target['value']);
    }
    event.target['value'] = '';
  }


  postArticle() {
    this.newArticle = this.formArticle.value;
    if (this.tagList) {
      this.newArticle.tagList = this.tagList
    }
    if (!this.check) {
      this.articleService.postNewArticle(this.newArticle).subscribe((data) => {
        this.router.navigate(['/article/', data['article']['slug']]);
      }, err => {
        this.errNewArticle = this.appService.getError(err);
      })
    } else {
      this.articleService.updateArticle(this.newArticle, this.slug).subscribe((data) => {
        this.router.navigate(['/article/', data['article']['slug']]);
      }, err => {
        this.errNewArticle = this.appService.getError(err);
      })
    }
  }

  removetab(index) {
    this.tagList.splice(index, 1);
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '20rem',
    minHeight: '7rem',
    placeholder: 'Write your article (in markdown)...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
}
