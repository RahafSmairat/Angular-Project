import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  msg = '';
  constructor(private ser: UserService, private route: Router) { }

  login(userData: any) {
    if (userData.email.trim() == '' || userData.password.trim() == '') {
      this.msg = "Please fill out all fields! 😇"
      return;
    }
    this.ser.getAllUsers().subscribe(data => {
      let user = data.find((u: any) => u.email == userData.email && u.password == userData.password)
      if (user) {
        const email = {email : user.email}
        this.ser.LogIn(email).subscribe(() => {
          this.ser.loggedInUser.next(email);
          this.route.navigate([''])
        })
      }
      else {
        this.msg = "Worng email or password! 🫥"
      }
    })
  }
}
