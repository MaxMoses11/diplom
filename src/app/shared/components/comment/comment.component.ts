import {Component, Input, OnInit} from '@angular/core';
import {CommentType} from "../../../../types/comment.type";
import {CommentService} from "../../services/comment.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {CommentActionType} from "../../../../types/comment-action.type";

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

    @Input() comment!: CommentType;
    date: string = '';

    constructor(private commentService: CommentService, private _snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
        const commentDate = new Date(this.comment.date);
        const options: any = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: undefined
        }
        this.date = commentDate.toLocaleString("ru-RU", options);
    }

    addActionToComment(action: string) {
        this.commentService.applyAction(this.comment.id, action)
            .subscribe({
                next: data => {
                    if (data.error) {
                        this._snackBar.open(data.message);
                        throw new Error(data.message);
                    }

                    if (action === 'like' || action === 'dislike') {
                        this.commentService.getActionForComment(this.comment.id)
                            .subscribe({
                                next: data => {
                                    if ((data as DefaultResponseType).error !== undefined) {
                                        this._snackBar.open((data as DefaultResponseType).message);
                                        throw new Error((data as DefaultResponseType).message);
                                    }

                                    if ((data as CommentActionType[]).length > 0) {
                                        if (this.comment.action) {
                                            if (this.comment.action === 'like') {
                                                this.comment.likesCount--;
                                            } else {
                                                this.comment.dislikesCount--;
                                            }
                                        }
                                        this.comment.action = (data as CommentActionType[])[0].action;
                                        if ((data as CommentActionType[])[0].action === 'like') {
                                            this.comment.likesCount++;
                                        } else if ((data as CommentActionType[])[0].action === 'dislike') {
                                            this.comment.dislikesCount++;
                                        }
                                    } else {
                                        this.comment.action = '';
                                        if (action === 'like') {
                                            this.comment.likesCount--;
                                        } else if (action === 'dislike') {
                                            this.comment.dislikesCount--;
                                        }
                                    }
                                    this._snackBar.open('Ваш голос учтён.');
                                },
                                error: err => {
                                    this._snackBar.open(err.error.message);
                                }
                            })
                    }

                    if (action === 'violate') {
                        this._snackBar.open('Жалоба отправлена');
                    }
                },
                error: () => {
                    this._snackBar.open('Жалоба уже была отправлена');
                }
            });
    }
}
