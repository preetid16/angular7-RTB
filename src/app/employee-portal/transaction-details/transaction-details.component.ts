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
    const userId = Number(localStorage.getItem('userId'));
    const self = this;
    if (userId !== undefined) {
      this.userService.getUserById(userId).subscribe(response => {

        if (response.is_admin) {
          this.userService.getUsers()
            .subscribe(data => {

              let filteredDetails = data.filter((dataObj) => {
                return dataObj.tranaction_history && dataObj.tranaction_history.length > 0;
              });
              let aa = [];
              filteredDetails.forEach(element => {
                element.tranaction_history.forEach(innerElement => {
                  aa.push(innerElement);
                });

              });

              self.tranactionsArr = aa;

            });

        } else {
          self.tranactionsArr = response['tranaction_history'];
        }
      });
    } else {

    }
  }

}
