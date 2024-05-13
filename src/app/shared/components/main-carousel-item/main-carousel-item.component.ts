import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-carousel-item',
  templateUrl: './main-carousel-item.component.html',
  styleUrls: ['./main-carousel-item.component.scss']
})
export class MainCarouselItemComponent implements OnInit {

  @Input() item!: {promo: string, title: string, text?:string, image: string};
  constructor() { }

  ngOnInit(): void {
  }

}
