import {Component, Input, OnInit} from '@angular/core';
import {CommentType} from "../../../../types/comment.type";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment!: CommentType;
  date: string = '';
  constructor() { }

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

}
