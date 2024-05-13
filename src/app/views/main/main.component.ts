import { Component, OnInit } from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  sliderInfoItems = [
    {
      promo: "Предложение месяца",
      title: "Продвижение в Instagram для вашего бизнеса <span class='blue-text'>-15%</span>!",
      image: "slider-item-img1.png"
    },
    {
      promo: "Акция",
      title: "Нужен грамотный <span class='blue-text'>копирайтер</span>?",
      text: "Весь декабрь у нас действует акция на работу копирайтера.",
      image: "slider-item-img2.png"
    },
    {
      promo: "Новость дня",
      title: "<span class='blue-text'>6 место</span> в ТОП-10 SMM-агенств Москвы!",
      text: "Мы благодарим каждого, кто голосовал за нас!",
      image: "slider-item-img3.png"
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
