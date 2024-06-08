import {Component, OnInit} from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleResponseType} from "../../../../types/article-response.type";
import {AuthService} from "../../../core/auth/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommentService} from "../../../shared/services/comment.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {CommentType} from "../../../../types/comment.type";
import {CommentResponseType} from "../../../../types/comment-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {LoaderService} from "../../../shared/services/loader.service";
import {CommentActionType} from "../../../../types/comment-action.type";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  isLogged: boolean = false;
  hideBtn: boolean = false;
  article!: ArticleResponseType;
  comments: CommentType[] = [];
  appliedCommentCount: number = 0;
  haveMoreComments: boolean = false;
  pathToImage: string = '/assets/images/articles/';
  relatedArticles: ArticleResponseType[] = [];

  commentForm = this.fb.group({
    comment: ['', Validators.required]
  });
  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private articleService: ArticleService,
              private commentService: CommentService,
              private _snackBar: MatSnackBar,
              private authService: AuthService,
              private router: Router,
              private loaderService: LoaderService) {
    this.isLogged = this.authService.getIsLogged();
  }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLoggedIn: boolean) => {
      this.isLogged = isLoggedIn;
    });

      this.loaderService.isShowed$.subscribe((isShowed: boolean) => {
          this.hideBtn = isShowed;
      });

    this.activatedRoute.params.subscribe(params => {
      this.articleService.getArticle(params['url'])
        .subscribe({
            next: data => {
                this.article = data;
                this.comments = data.comments as CommentType[];
                this.applyActionsToComments();
                this.appliedCommentCount = 3;

                if (this.article.commentsCount && this.article.commentsCount > this.appliedCommentCount) {
                    this.haveMoreComments = true;
                }

                this.articleService.getRelatedArticles(params['url'])
                    .subscribe(articles => {
                        this.relatedArticles = articles;
                    });
            },
            error: (error: HttpErrorResponse) => {
              this._snackBar.open('Произошла ошибка при загрузке статьи. Обратитесь в поддержку')
              this.router.navigate(['/blog']);
            }
        });
    });
  }

  addComment() {
    if (this.commentForm.valid && this.commentForm.value.comment) {
      this.commentService.addComment(this.commentForm.value.comment, this.article.id)
        .subscribe({
          next: (data: DefaultResponseType) => {
            if (!data.error) {
              this._snackBar.open('Комментарий успешно добавлен');
              this.activatedRoute.params.subscribe(params => {
                this.articleService.getArticle(params['url'])
                  .subscribe(data => {
                    this.comments = data.comments as CommentType[];
                    this.applyActionsToComments();
                    this.appliedCommentCount = 3;
                      if (this.article.commentsCount && this.article.commentsCount > this.appliedCommentCount) {
                          this.haveMoreComments = true;
                      }
                  });
              });
              this.commentForm.get('comment')?.setValue('');
            } else {
              this._snackBar.open('Произошла ошибка при добавлении комментария, попробуйте позже.');
            }
          }
        })
    } else {
      this._snackBar.open('Необходимо заполнить поле ввода');
    }
  }

  addCommentsToPage() {
      this.loaderService.show();
    const paramsObject = {
      offset: this.appliedCommentCount,
      article: this.article.id
    }
    this.commentService.getComments(paramsObject)
      .subscribe({
          next: (data: CommentResponseType) => {
            data.comments.forEach(comment => this.comments = [...this.comments, comment]);
            this.applyActionsToComments();
            this.appliedCommentCount += 10;
            this.haveMoreComments = !!(data.allCount && data.allCount > this.appliedCommentCount);
            this.loaderService.hide();
          }
      });
  }

  applyActionsToComments() {
      this.commentService.getArticleCommentActions(this.article.id)
          .subscribe({
              next: data => {
                  if ((data as DefaultResponseType).error !== undefined) {
                      throw new Error((data as DefaultResponseType).message);
                  }

                  if ((data as CommentActionType[]).length > 0) {
                      (data as CommentActionType[]).forEach(dataItem => {
                          this.comments.forEach(comment => {
                              if (dataItem.comment === comment.id) {
                                  comment.action = dataItem.action;
                              }
                          })
                      });
                  }
              },
          });
  }
}
