import { Component } from '@angular/core';
import { ShopService } from '../../Services/shop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../Services/user.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userData: any = null;
  show = false;
  constructor(private ser: ShopService, private _ser: UserService, private route: Router, private router: HttpClient, private Activep: ActivatedRoute) { }

  ngOnInit() {
    this.getUserData();
    this.getOrders();
    this.getUserOrders();
  }

  getUserData() {
    this.userData = this._ser.getUser().subscribe(
      (data) => {
        this.userData = data;
      })
  }

  edit() {
    this.show = true;
  }

  updateUser(updatedUser: any) {
    this.userData = updatedUser;
    this.show = false;
  }

  UserOrderss: any
  Orders: any
  UserID: any
  Useremail: any
  Order: any
  orderItems: any
  getUserOrders() {
    this._ser.getUser().pipe(
      switchMap((user: any) => {
        this.Useremail = user.email;
        return this._ser.getAllUsers();
      })
    ).subscribe(users => {
      let user = users.find((u: any) => u.email === this.Useremail);

      if (user) {
        this.UserID = user.id;
        console.log("User ID:", this.UserID);

        this.ser.getAllOrders().subscribe((data) => {
          this.UserOrderss = data.filter((Orders: any) => Orders.userId == this.UserID);
        });

      } else {
        console.log("User not found!");
      }
    });
  }
  getOrders() {
    this.ser.getAllOrders().subscribe((data) => {
      this.Orders = data;
    })
  }

  getOrderrItems() {
    console.log("getOrderrItems() called!"); // تأكيد إنه الميثود نادت

    this.Order = this.Activep.snapshot.paramMap.get('id');
    console.log("Order ID from route:", this.Order); // تأكيد إنه في ID

    this.ser.getAllOrderItems().subscribe((data) => {
      console.log("All Order Items:", data); // تأكيد إنه API رجّع بيانات

      this.orderItems = data.filter((Products: any) => Products.orderId == this.Order);
      console.log("Filtered Order Items:", this.orderItems); // تأكيد الفلترة
    });
  }


}
