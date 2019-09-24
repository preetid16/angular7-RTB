import { Component, OnInit } from '@angular/core';
import { UserService } from './../../userData.service';
import { Item } from "./../../shared/interface/item.model";

@Component({
  selector: 'app-item-of-day',
  templateUrl: './item-of-day.component.html',
  styleUrls: ['./item-of-day.component.css']
})
export class ItemOfDayComponent implements OnInit {
  item: Item[];
  displayedColumns: string[] = ['id', 'item_name', 'quantity', 'price', 'image', 'actionColumn'];

  constructor(private service: UserService) { }

  ngOnInit() {
    this.service.getItemList()
      .subscribe(data => {
        this.item = data.filter(dataObj => {
          return dataObj.is_item_of_day == true && dataObj.quantity > 0;
        });
      });
  }

}
