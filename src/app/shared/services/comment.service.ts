import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {CommentResponseType} from "../../../types/comment-response.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {CommentActionType} from "../../../types/comment-action.type";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getComments(params: {offset: number, article: string}): Observable<CommentResponseType> {
    return this.http.get<CommentResponseType>(environment.api + 'comments', {
      params: params
    });
  }

  addComment(text: string, article: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments', {
      text: text,
      article: article
    });
  }

  applyAction(id: string, type: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments/' + id + '/apply-action', {
      action: type
    });
  }

  getArticleCommentActions(articleId: string): Observable<CommentActionType[] | DefaultResponseType> {
    return this.http.get<CommentActionType[] | DefaultResponseType>(environment.api + 'comments/article-comment-actions?articleId=' + articleId);
  }

  getActionForComment(commentId: string) {
    return this.http.get<CommentActionType[] | DefaultResponseType>(environment.api + 'comments/' + commentId + '/actions');
  }
}
