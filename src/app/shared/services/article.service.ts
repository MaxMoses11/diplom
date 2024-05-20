import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ArticlesResponseType} from "../../../types/articles-response.type";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getPopularArticles() {
    return this.http.get<ArticlesResponseType[]>(environment.api + 'articles/top');
  }
}
