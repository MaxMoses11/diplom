import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ArticlesResponseType} from "../../../types/articles-response.type";
import {CategoryResponseType} from "../../../types/category-response.type";
import {ArticlesWithPagesResponseType} from "../../../types/articles-with-pages-response.type";
import {ActiveParamsType} from "../../../types/active-params.type";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getPopularArticles(): Observable<ArticlesResponseType[]> {
    return this.http.get<ArticlesResponseType[]>(environment.api + 'articles/top');
  }

  getArticles(params: ActiveParamsType): Observable<ArticlesWithPagesResponseType> {
    return this.http.get<ArticlesWithPagesResponseType>(environment.api + 'articles', {
      params: params
    });
  }

  getCategoriesArticle(): Observable<CategoryResponseType[]> {
    return this.http.get<CategoryResponseType[]>(environment.api + 'categories');
  }
}
// 1:13:09
