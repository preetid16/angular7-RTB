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
     const userName = localStorage.getItem('userName');
          if (userName !== undefined) {
                this.userService.getUsers().subscribe(response => { 
                  const user = response.filter(user => {
                    return user.username === userName;
                  });
                  this.currentBalance =  user[0]['balance'];
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
          if (userName !== undefined) {
                self.userService.getUsers().subscribe(response => { 
                  const user = response.filter(user => {
                    return user.username === userName;
                  });
                  user[0]['balance'] += value;
                  user[0]['tranaction_history'].push({
                    'userName' :userName,
                    'amount': value,
                    'type':'credit',
                    'date':new Date()
                  });
                  console.log(user);
                  self.currentBalance = user[0]['balance'];
                  self.userService.updateUser(user[0])
                        .subscribe(data => {
                          swal("Success", "Balance Added successfully!!", "success");
                  })
              });
          }
        }
    });
  }
}
