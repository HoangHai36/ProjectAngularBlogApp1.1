import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  headers: HttpHeaders;
  urlHome = 'https://conduit.productionready.io/api/';
  constructor(private http: HttpClient) { }
  setToken() {
    this.headers = new HttpHeaders({
      'Authorization': `Token ${localStorage.getItem("token")}`
    });
  }

  getYourArticle(offset, limit = '10'): Observable<Object> {
    this.setToken();
    return this.http.get(this.urlHome + 'articles/feed', {
      params: {
        limit: limit,
        offset: offset,
      },
      headers: this.headers
    })
  }

  getGlobalArticle(isLogin: boolean, offset): Observable<Object> {
    if (isLogin) {
      this.setToken();
      return this.http.get(this.urlHome + 'articles', {
        params: {
          limit: '10',
          offset: offset,
        },
        headers: this.headers,
      });
    }
    return this.http.get(this.urlHome + 'articles', {
      params: {
        limit: '10',
        offset: offset
      }
    });
  }
  getTabs(): Observable<Object> {
    return this.http.get(this.urlHome + 'tags');
  }

  getTabArticle(tab, isLogin, offset): Observable<Object> {
    if (isLogin) {
      this.setToken();
      return this.http.get(this.urlHome + `articles`, {
        params: {
          limit: '10',
          offset: offset,
          tag: tab
        },
        headers: this.headers
      })
    }
    return this.http.get(this.urlHome + `articles`, {
      params: {
        limit: '10',
        offset: '0',
        tag: tab
      }
    })
  }

  getMyArticle(name, isLogin, offset, limit = '10'): Observable<Object> {
    if (isLogin) {
      this.setToken();
      return this.http.get(this.urlHome + 'articles', {
        params: {
          limit: limit,
          offset: offset,
          author: name,
        },
        headers: this.headers
      })
    }
    return this.http.get(this.urlHome + 'articles', {
      params: {
        limit: limit,
        offset: offset,
        author: name,
      }
    })
  }

  getYourArticlefavorite(name, isLogin, offset): Observable<Object> {
    if (isLogin) {
      this.setToken();
      return this.http.get(this.urlHome + 'articles', {
        params: {
          limit: '5',
          offset: offset,
          favorited: name
        },
        headers: this.headers
      })
    }
    return this.http.get(this.urlHome + 'articles', {
      params: {
        limit: '5',
        offset: offset,
        favorited: name
      }
    })
  }

  postFavoriteArticle(slug): Observable<Object> {
    this.setToken();
    return this.http.post(this.urlHome + `articles/${slug}/favorite`, { name: 'abc' }, {
      headers: this.headers
    })
  }

  deleteFavoriteArticle(slug): Observable<Object> {
    this.setToken();
    return this.http.delete(this.urlHome + `articles/${slug}/favorite`, {
      headers: this.headers
    })
  }

  postFollowUser(userName): Observable<Object> {
    this.setToken();
    return this.http.post(this.urlHome + `profiles/${userName}/follow`, { name: 'abc' }, {
      headers: this.headers
    })
  }

  deleteFollowUser(userName): Observable<Object> {
    this.setToken();
    return this.http.delete(this.urlHome + `profiles/${userName}/follow`, {
      headers: this.headers
    })
  }


  getArticleDetail(slug): Observable<Object> {
    this.setToken();
    if (localStorage.getItem('token')) {
      return this.http.get(this.urlHome + `articles/${slug}`, {
        headers: this.headers
      });
    }
    return this.http.get(this.urlHome + `articles/${slug}`);
  }

  // Create Article
  postNewArticle(article): Observable<Object> {
    this.setToken();
    return this.http.post(this.urlHome + 'articles', { article: article }, {
      headers: this.headers
    })
  }

  updateArticle(article, slug): Observable<Object> {
    this.setToken();
    return this.http.put(this.urlHome + `articles/${slug}`, { article: article }, {
      headers: this.headers
    })
  }

  deleteArticle(slug): Observable<Object> {
    this.setToken();
    return this.http.delete(this.urlHome + `articles/${slug}`, {
      headers: this.headers
    })
  }

  getCommentArticle(slug): Observable<Object> {
    return this.http.get(this.urlHome + `articles/${slug}/comments`);
  }

  postCommentArticle(slug, comment): Observable<Object> {
    this.setToken();
    return this.http.post(this.urlHome + `articles/${slug}/comments`, {
      comment: comment
    }, {
      headers: this.headers
    });
  }

  deleteCommentArticle(slug, id): Observable<Object> {
    this.setToken();
    if (localStorage.getItem('token')) {
      return this.http.delete(this.urlHome + `articles/${slug}/comments/${id}`, {
        headers: this.headers
      });
    }
  }
}

