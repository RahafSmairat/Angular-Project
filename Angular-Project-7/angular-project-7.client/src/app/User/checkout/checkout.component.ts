import { Component } from '@angular/core';
import { ShopService } from '../../Services/shop.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  cartItems: any[] = [];
  loggedInUser: any;
  paymentMethodId: number = 1;
  totalAmount: number = 0;

  constructor(private shopService: ShopService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cartItems = this.shopService.getCartItems();
    console.log(this.cartItems)
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + (item.productPrice * item.quantity), 0);
    this.getLoggedInUser();
  }

  getLoggedInUser() {
    this.http.get('https://67d61653286fdac89bc11c6d.mockapi.io/loggedInUser/1').subscribe(
      (user: any) => {
        this.loggedInUser = user;
      },
      (error) => console.error('Error fetching logged-in user:', error)
    );
  }

  placeOrder() {
    if (!this.loggedInUser) {
      console.error('User not logged in!');
      return;
    }

    // Create Order
    const newOrder = {
      userId: this.loggedInUser.id,
      totalAmount: this.totalAmount,
      createdAt: new Date().toISOString(),
      paymentMethodId: this.paymentMethodId
    };

    this.http.post('https://67d293c190e0670699be2962.mockapi.io/Orders', newOrder).subscribe(
      (orderResponse: any) => {
        console.log('Order Created:', orderResponse);
        this.addOrderItems(orderResponse.id);
      },
      (error) => console.error('Error creating order:', error)
    );
  }

  addOrderItems(orderId: number) {
    const orderItems = this.cartItems.map(item => ({
      orderId: orderId,
      productId: item.productId,
      quantity: item.quantity,
      price: item.productPrice
    }));

    orderItems.forEach(orderItem => {
      this.http.post('https://67e6d5ac6530dbd31111a268.mockapi.io/OrderItems', orderItem).subscribe(
        (response) => console.log('Order Item Added:', response),
        (error) => console.error('Error adding order item:', error)
      );
    });
  }
}
