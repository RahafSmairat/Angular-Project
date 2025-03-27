import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userApi = "https://67d30be18bca322cc268fdac.mockapi.io/users"
  addressesApi = "https://67d30be18bca322cc268fdac.mockapi.io/addresses"
  paymentApi = "https://67e3178397fc65f53538b76f.mockapi.io/payment"
  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<any[]>(this.userApi)
  }

  postToUsers(data:any) {
    return this.http.post(this.userApi, data)
  }

  editUser(id:any, data: any) {
    return this.http.put(`${this.userApi}/${id}`, data)
  }

  ///

  getAllAddresses() {
    return this.http.get<any[]>(this.addressesApi)
  }

  postToAddresses(data: any) {
    return this.http.post(this.addressesApi, data)
  }

  editAddress(id: any, data: any) {
    return this.http.put(`${this.addressesApi}/${id}`, data)
  }

  deleteAddress(id: any) {
    return this.http.delete(`${this.addressesApi}/${id}`)
  }

  ///

  getAllPayments() {
    return this.http.get<any[]>(this.paymentApi)
  }

  postToPayments(data: any) {
    return this.http.post(this.paymentApi, data)
  }

  editPayment(id: any, data: any) {
    return this.http.put(`${this.paymentApi}/${id}`, data)
  }

  deletePayment(id: any) {
    return this.http.delete(`${this.paymentApi}/${id}`)
  }

  ///
  loggedInUser = new BehaviorSubject<any>(null);

  getLoggedInUser() {
    return this.loggedInUser.asObservable();
  }

  LogIn(user: { email: string }) {
    this.loggedInUser.next(user);
    return this.http.post('https://67d61653286fdac89bc11c6d.mockapi.io/loggedInUser', user);
  }

  clearLoggedInUser() {
    this.loggedInUser.next(null);
    this.http.get<any[]>('https://67d61653286fdac89bc11c6d.mockapi.io/loggedInUser')
      .subscribe(users => {
        users.forEach(user => {
          this.http.delete(`https://67d61653286fdac89bc11c6d.mockapi.io/loggedInUser/${user.id}`)
            .subscribe(() => {
            });
        });
      });
  }
}
