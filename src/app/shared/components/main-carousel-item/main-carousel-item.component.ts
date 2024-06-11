import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-main-carousel-item',
  templateUrl: './main-carousel-item.component.html',
  styleUrls: ['./main-carousel-item.component.scss']
})
export class MainCarouselItemComponent implements OnInit {

  @Input() item!: {promo: string, title: string, text?:string, image: string, id: string};
  @Output() orderRequest: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  order(id: string) {
    this.orderRequest.emit(id);
  }
}
