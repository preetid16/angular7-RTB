import { Component, OnInit } from '@angular/core';
import { UserService } from './../../userData.service';
import { Item } from "./../../shared/interface/item.model";
@Component({
  selector: 'app-item-master-list',
  templateUrl: './item-master-list.component.html',
  styleUrls: ['./item-master-list.component.css']
})
export class ItemMasterListComponent implements OnInit {
item: Item[];
 displayedColumns: string[] = ['item_id', 'item_name', 'quantity', 'price', 'image', 'actionColumn'];

  constructor(private service: UserService) { }

  ngOnInit() {
    this.service.getItemList()
      .subscribe(data => {
        this.item = data;
        console.log(this.item)
      });
  }

}
