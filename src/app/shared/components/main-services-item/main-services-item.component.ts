import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServiceType} from "../../../../types/service.type";

@Component({
  selector: 'app-main-services-item',
  templateUrl: './main-services-item.component.html',
  styleUrls: ['./main-services-item.component.scss']
})
export class MainServicesItemComponent implements OnInit {

  @Input() service!: ServiceType;
  @Output() orderRequest: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  order(id: string) {
    this.orderRequest.emit(id);
  }
}
