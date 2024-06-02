import {Component, Input, OnInit} from '@angular/core';
import {CommentType} from "../../../../types/comment.type";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment!: CommentType;
  constructor() { }

  ngOnInit(): void {
  }

}
