import { Component } from '@angular/core';
import { ShopService } from '../../Services/shop.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  categories: any[] = [];
  displayedCategories: any[] = [];
  discountedProducts: any[] = [];

  constructor(private ser: ShopService) { }

  ngOnInit() {
    this.getTopCategories()
    this.getProductsOnSale()
  }

  getTopCategories() {
    this.ser.getAllCategories().subscribe(categories => {
      this.categories = categories; 
      this.displayedCategories = categories.slice(0, 6);
    });
  }

  getProductsOnSale() {
    this.ser.getAllProducts().subscribe(products => {
      this.discountedProducts = products
        .filter(product => product.discount) 
        .sort((a, b) => this.extractDiscount(b.discount) - this.extractDiscount(a.discount))
        .slice(0, 6);
    });
  }

  extractDiscount(discount: string): number {
    return parseInt(discount.replace('%', '')) || 0; 
  }
}
