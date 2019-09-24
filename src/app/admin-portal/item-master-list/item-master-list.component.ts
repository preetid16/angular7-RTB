import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from './../../userData.service';
import { Item } from "./../../shared/interface/item.model";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-master-list',
  templateUrl: './item-master-list.component.html',
  styleUrls: ['./item-master-list.component.css']
})
export class ItemMasterListComponent implements OnInit {
  item: Item[];
  displayedColumns: string[] = ['item_name', 'quantity', 'price', 'image', 'actionColumn'];

  constructor(private service: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.service.getItemList()
      .subscribe(data => {
        this.item = data.filter(dataObj => {
          return dataObj.quantity > 0;
        });
      });
  }

  deleteItem(item: Item, event: Event) {
    this.service.deleteItem(item.id)
      .subscribe(data => {
        this.item = this.item.filter(u => u !== item);
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
      is_item_of_day : new FormControl('', []),
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
  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.itemAddForm.controls[controlName].hasError(errorName);
  }

}