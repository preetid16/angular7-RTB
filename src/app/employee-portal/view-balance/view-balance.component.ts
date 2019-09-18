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
      if(value !== undefined && typeof value === 'number') {
          const userName = localStorage.getItem('userName');
          if (userName !== undefined) {
                self.userService.getUsers().subscribe(response => { 
                  const user = response.filter(user => {
                    return user.userName === userName;
                  });
                  user['money'] += value;
                  self.currentBalance = user['money'];
              });
          }
        }
    });
   
    

  }
}
