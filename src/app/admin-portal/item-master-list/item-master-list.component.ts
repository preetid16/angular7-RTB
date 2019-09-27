import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from './../../userData.service';
import { Item } from "./../../shared/interface/item.model";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-item-master-list',
  templateUrl: './item-master-list.component.html',
  styleUrls: ['./item-master-list.component.css']
})
export class ItemMasterListComponent implements OnInit {
  displayedColumns: string[] = ['item_name', 'quantity', 'price', 'image', 'actionColumn'];
  dataSource = new MatTableDataSource<Item>();
  constructor(private service: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.service.getItemList()
      .subscribe(data => {
        this.dataSource.data = data.filter(dataObj => {
          return dataObj.quantity > 0;
        });
      });

    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.item_name.toLowerCase().includes(filter);
    };
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  deleteItem(item: Item, event: Event) {
    this.service.deleteItem(item.id)
      .subscribe(data => {
        this.dataSource.data = this.dataSource.data.filter(u => u !== item);
      });
  };

  openDialog() {
    const dialogRef = this.dialog.open(MaterListAddItemDialog, {
      width: '450px'
      // data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}



@Component({
  selector: 'mater-list-add-item-dialog',
  templateUrl: './mater-list-add-item-dialog.html',
})
export class MaterListAddItemDialog implements OnInit {
  public itemAddForm: FormGroup;
  srcResult;

  constructor(
    public dialogRef: MatDialogRef<MaterListAddItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Item,
    private service: UserService, ) { }
  ngOnInit() {
    this.itemAddForm = new FormGroup({
      item_name: new FormControl('', [Validators.required, Validators.maxLength(25)]),
      quantity: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      is_item_of_day: new FormControl('', []),
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  addItem(itemAddFormObj) {
    console.log(itemAddFormObj);
    if (itemAddFormObj.image_src == '' || itemAddFormObj.image_src == undefined) {
      itemAddFormObj.image_src = 'assets/img/1.png';
    }
    this.service.addItem(this.itemAddForm.value)
      .subscribe(data => {
        swal('success', "Item added Successfully.", "success");
      });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.itemAddForm.controls[controlName].hasError(errorName);
  }

}