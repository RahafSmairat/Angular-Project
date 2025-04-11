import { Component } from '@angular/core';
import { ShopService } from '../../Services/shop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../Services/user.service';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userData: any = null;
  show = false;
  form = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  constructor(private ser: ShopService, private _ser: UserService, private route: Router, private router: HttpClient, private Activep: ActivatedRoute) { }

  ngOnInit() {
    this.getUserData();
    this.getOrders();
    this.getUserOrders();
    this.getPaymentMethods();
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
    console.log("getOrderrItems() called!"); 

    this.Order = this.Activep.snapshot.paramMap.get('id');
    console.log("Order ID from route:", this.Order); 
    this.ser.getAllOrderItems().subscribe((data) => {
      console.log("All Order Items:", data); 

      this.orderItems = data.filter((Products: any) => Products.orderId == this.Order);
      console.log("Filtered Order Items:", this.orderItems); 
    });
  }
  paymentData = {
    type: '',
    cardNumber: '',
    expiryDate: '',
    userId: '',
    cvc: ''
  };

  submitPayment(form: any) {
    this.paymentData.userId = this.userData.id
    this._ser.getAllPayments().subscribe((data) => {
      var payments = data.filter(p => p.userId == this.userData.id)
      if (payments.length == 2) {
        Swal.fire({
          title: 'Cannot Add More Than Two Payments!',
          icon: 'warning',
          confirmButtonText: 'OK',
          color: '#5a2a2a',
          confirmButtonColor: '#ff6565',
        }).then(response => {
          this.getPaymentMethods();
        });
      } else {
        this._ser.postToPayments(this.paymentData).subscribe(() => {
          Swal.fire({
            title: 'Payment Method Was Added!',
            text: 'The Payment Method has been successfully added.',
            icon: 'success',
            confirmButtonText: 'OK',
            color: '#5a2a2a',
            confirmButtonColor: '#ff6565',
          }).then(response => {
            this.getPaymentMethods();
          });
        })
      }
    })
  }

  //////////////////////
  userPayments: any;
  getPaymentMethods() {
    this._ser.getAllPayments().subscribe((payments) => {
      this.userPayments = payments.filter(payment => payment.userId == this.userData.id);
    })
  }

  delete(id: any) {
    this._ser.deletePayment(id).subscribe(() => {
      Swal.fire({
        title: 'Payment Method Was deleted!',
        icon: 'success',
        confirmButtonText: 'OK',
        color: '#5a2a2a',
        confirmButtonColor: '#ff6565',
      }).then(response => {
        this.getPaymentMethods();
      });
    })
  }
  ///////////////

  resetPassword() {
    if (!this.form.currentPassword || !this.form.newPassword || !this.form.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all fields.',
        confirmButtonColor: '#ff6565'
      });
      return;
    }

    if (this.form.currentPassword !== this.userData.password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Current password is incorrect.',
        confirmButtonColor: '#ff6565'
      });
      return;
    }

    if (this.form.newPassword !== this.form.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'New passwords do not match.',
        confirmButtonColor: '#ff6565'
      });
      return;
    }

    const updatedUser = {
      ...this.userData,
      password: this.form.newPassword
    };

    this._ser.editUser(this.userData.id, updatedUser).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Password updated successfully.',
          confirmButtonColor: '#ff6565'
        });
        this.form = { currentPassword: '', newPassword: '', confirmPassword: '' };
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong. Try again later.',
          confirmButtonColor: '#ff6565'
        });
      }
    });
  }

  /////////////////

  addressData = {
    street: '',
    city: '',
    country: '',
    userId: ''
  };

  submitAddress(form: any) {
    this.addressData.userId = this.userData.id
    this._ser.getAllAddresses().subscribe((data) => {
      var adresses = data.filter(p => p.userId == this.userData.id)
      if (adresses.length == 2) {
        Swal.fire({
          title: 'Cannot Add More Than Two Addresses!',
          icon: 'warning',
          confirmButtonText: 'OK',
          color: '#5a2a2a',
          confirmButtonColor: '#ff6565',
        }).then(response => {
          this.getAddresses();
        });
      } else {
        this._ser.postToAddresses(this.addressData).subscribe(() => {
          Swal.fire({
            title: 'Address Was Added!',
            text: 'The Address has been successfully added.',
            icon: 'success',
            confirmButtonText: 'OK',
            color: '#5a2a2a',
            confirmButtonColor: '#ff6565',
          }).then(response => {
            this.getAddresses();
          });
        })
      }
    })
  }

  userAddresses: any;
  getAddresses() {
    this._ser.getAllAddresses().subscribe((addresses) => {
      this.userAddresses = addresses.filter(a => a.userId == this.userData.id);
    })
  }

  deleteAddress(id: any) {
    this._ser.deleteAddress(id).subscribe(() => {
      Swal.fire({
        title: 'Address Was deleted!',
        icon: 'success',
        confirmButtonText: 'OK',
        color: '#5a2a2a',
        confirmButtonColor: '#ff6565',
      }).then(response => {
        this.getAddresses();
      });
    })
  }
}
