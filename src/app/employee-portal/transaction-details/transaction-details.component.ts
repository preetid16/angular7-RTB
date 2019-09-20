import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../shared/angular-material.module';
import { UserService } from '../../userData.service';
@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {
  displayedColumns: string[] = ['userName', 'amount', 'date', 'type'];
  tranactionsArr = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    //let userId = localStorage.getItem('id');
    let userId = 15;
    const self = this;
    if (userId !== undefined) {
      this.userService.getUserById(userId).subscribe(response => {
        self.tranactionsArr = response['tranaction_history'];
        console.log(self.tranactionsArr);
      });
    }
  }

}
