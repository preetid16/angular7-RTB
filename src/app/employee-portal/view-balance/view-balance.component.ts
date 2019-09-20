import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../shared/angular-material.module';
import { UserService } from '../../userData.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-view-balance',
  templateUrl: './view-balance.component.html',
  styleUrls: ['./view-balance.component.css']
})
export class ViewBalanceComponent implements OnInit {
  currentBalance: number;
  constructor(private userService: UserService) { }

  ngOnInit() {
     const userId = Number(localStorage.getItem('userId'));
          if (userId !== undefined) {
                this.userService.getUserById(userId).subscribe(response => {
                  this.currentBalance =  response['balance'];
            });
      }
  }
  addMoney() {
     const self = this;
    swal({
      content: {
        element: "input",
        attributes: {
          placeholder: "Enter Amount you want to add",
          type: "text",
        },
      },
    }).then((value) => {
      value = Number(value);
      if(value !== undefined && typeof value === 'number') {
          const userName = localStorage.getItem('userName');
          const id = Number(localStorage.getItem('userId'));
          if (id !== undefined) {
                self.userService.getUserById(id).subscribe(user => {
                  user['balance'] += value;
                  user['tranaction_history'].push({
                    'userName' :userName,
                    'amount': value,
                    'type':'credit',
                    'date':new Date()
                  });
                  self.currentBalance = user['balance'];
                  self.userService.updateUser(user)
                        .subscribe(data => {
                          swal("Success", "Balance Added successfully!!", "success");
                  })
              });
          }
        }
    });
  }
}
