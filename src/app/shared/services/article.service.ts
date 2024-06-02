import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ArticleResponseType} from "../../../types/article-response.type";
import {CategoryResponseType} from "../../../types/category-response.type";
import {ArticlesWithPagesResponseType} from "../../../types/articles-with-pages-response.type";
import {ActiveParamsType} from "../../../types/active-params.type";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getPopularArticles(): Observable<ArticleResponseType[]> {
    return this.http.get<ArticleResponseType[]>(environment.api + 'articles/top');
  }

  getArticles(params: ActiveParamsType): Observable<ArticlesWithPagesResponseType> {
    return this.http.get<ArticlesWithPagesResponseType>(environment.api + 'articles', {
      params: params
    });
  }

  getCategoriesArticle(): Observable<CategoryResponseType[]> {
    return this.http.get<CategoryResponseType[]>(environment.api + 'categories');
  }

  getArticle(url: string): Observable<ArticleResponseType> {
    return this.http.get<ArticleResponseType>(environment.api + 'articles/' + url);
  }

  getRelatedArticles(url: string): Observable<ArticleResponseType[]> {
    return this.http.get<ArticleResponseType[]>(environment.api + 'articles/related/' + url);
  }
}
