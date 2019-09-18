import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularMaterialModule } from '../../shared/angular-material.module';
import { UserService } from '../../userData.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
export interface PeriodicElement {
  item_id: number;
  item_name: string;
  quantity: number;
  image_src: string;
  price: number;
}

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  displayedColumns: string[] = ['select','item_id', 'item_name', 'quantity', 'image', 'price'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  selection = new SelectionModel<PeriodicElement>(true, []);
  constructor(private userService: UserService) {

  }
  ngOnInit() {
    const self = this;
    const initialSelection = [];
    const allowMultiSelect = true
    this.userService.getItemList()
                    .subscribe((res) => {
                      //console.log(res);
                      self.dataSource = new MatTableDataSource<PeriodicElement>(res);
                    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.item_id + 1}`;
  }
  buyItem() {
    console.log(this.selection['_selected']);
    
  }
}
