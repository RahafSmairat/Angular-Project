import { Component } from '@angular/core';
import { Product } from '../shope/shope.component';
import Swal from 'sweetalert2';
import { ShopService } from '../../Services/shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {

  constructor(private _ser: ShopService, private router: Router) { }

  filteredProductsById: Product[] = [];

  ngOnInit(): void {
    const wishlistData = localStorage.getItem('wishlist');
    if (wishlistData) {
      this.filteredProductsById = JSON.parse(wishlistData);
    }
  }

  removeFromWishlist(productId: number): void {
    this.filteredProductsById = this.filteredProductsById.filter(product => product.id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(this.filteredProductsById));
  }

  ////////////////////////

  cart: any;

  addToCart(product: any) {
    this._ser.getAllCart().subscribe(cartData => {
      this.cart = cartData.find(c => c.userId == 1);

      if (this.cart) {
        const cartData = {
          productId: product.id,
          productName: product.name,
          productPrice: product.price,
          quantity: 1,
          cartId: this.cart.id,
          imageUrl: product.image
        };

        this._ser.postToCartItems(cartData).subscribe((response) => {
          console.log('✅ Product added to cart:', response);

          // Show success swal notification with "Go to Cart" and "Close" buttons
          Swal.fire({
            icon: 'success',
            title: 'Product added to cart!',
            text: 'You can view your cart now.',
            showCancelButton: true,
            confirmButtonText: 'Go to Cart',
            confirmButtonColor: '#ff6565',
            cancelButtonText: 'Close',
            focusCancel: true
          }).then((result) => {
            if (result.isConfirmed) {
              // Navigate to cart if "Go to Cart" is clicked
              this.router.navigate(['/cart'], { queryParams: { productId: product.id } });
            } else {
              // Close the alert if "Close" is clicked
              Swal.close();
            }
          });
        });
      } else {
        console.error("❌ Cart not found for user. Creating a new cart...");

        const newCart = { userId: 1 };

        this._ser.postToCart(newCart).subscribe((newCartResponse: any) => {
          this.cart = newCartResponse;

          const cartData = {
            productId: product.id,
            productName: product.name,
            productPrice: product.price,
            quantity: 1,
            cartId: this.cart.id,
            imageUrl: product.image
          };

          this._ser.postToCartItems(cartData).subscribe((response) => {
            console.log('✅ Product added to new cart:', response);

            // Show success swal notification with "Go to Cart" and "Close" buttons
            Swal.fire({
              icon: 'success',
              title: 'Product added to cart!',
              text: 'You can view your cart now.',
              showCancelButton: true,
              confirmButtonText: 'Go to Cart',
              confirmButtonColor: '#ff6565',
              cancelButtonText: 'Close',
              focusCancel: true
            }).then((result) => {
              if (result.isConfirmed) {
                // Navigate to cart if "Go to Cart" is clicked
                this.router.navigate(['/cart'], { queryParams: { productId: product.id } });
              } else {
                // Close the alert if "Close" is clicked
                Swal.close();
              }
            });
          });
        });
      }
    });
  }

}
