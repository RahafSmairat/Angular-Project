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
    if (userData.email.trim() === '' || userData.password.trim() === '') {
      this.msg = 'Please fill out all fields! 😇';
      return;
    }

    this.ser.getAllUsers().subscribe(data => {
      const user = data.find((u: any) => u.email === userData.email && u.password === userData.password);

      if (!user) {
        this.msg = 'Wrong email or password! 🫥';
        return;
      }

      // Check if admin
      if (user.email === 'admin@gmail.com' && user.password === '123') {
        this.route.navigate(['/dashboard']);
        return;
      }

      const loggedUser = {
        email: user.email,
        id: user.id,
        name: user.fullName,
        phone: user.phone
      };

      this.ser.LogIn(loggedUser).subscribe(() => {
        this.ser.loggedInUser.next(loggedUser);
        this.route.navigate(['']);
        this.ser.postUserData(userData).subscribe(() => { });
      });
    });
  }
}
