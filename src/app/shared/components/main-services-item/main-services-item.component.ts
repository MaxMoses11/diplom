import {Component, Input, OnInit} from '@angular/core';
import {ServiceType} from "../../../../types/service.type";

@Component({
  selector: 'app-main-services-item',
  templateUrl: './main-services-item.component.html',
  styleUrls: ['./main-services-item.component.scss']
})
export class MainServicesItemComponent implements OnInit {

  @Input() service!: ServiceType;
  constructor() { }

  ngOnInit(): void {
  }

  order(service: string) {

  }
}
