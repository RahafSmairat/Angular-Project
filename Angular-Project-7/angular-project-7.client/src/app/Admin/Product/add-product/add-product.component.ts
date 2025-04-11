import { Component } from '@angular/core';
import { ShopService } from '../../../Services/shop.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  category: any[] = [];   
  selectedId: any = null; 
  selectedCategoryName: string = 'Category'; 

  constructor(private _shop: ShopService, private _route: Router) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this._shop.getAllCategories().subscribe((data) => {
      this.category = data;
    });
  }

  addNewProduct(data: any) {
    data.categoryId = this.selectedId;
    this._shop.postToProducts(data).subscribe(() => {
      Swal.fire({
        title: 'Product Added!',
        text: 'The Product has been successfully added.',
        icon: 'success',
        confirmButtonText: 'OK',
        color: '#5a2a2a', 
        confirmButtonColor: '#ff6f91', 
      });
      this._route.navigate(['/dashboard/viewProduct']);
    }, error => {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add the voucher. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',

        color: '#5a2a2a',
        confirmButtonColor: '#d81b60',
      });
    });
  }
  

  //getSelectedData(item: any) {
  //  this.selectedId = item.id;
  //  this.selectedCategoryName = item.name;
  //}

  getSelectedData(event: any) {
    const selectedCategoryId = event.target.value;
    const selectedCategory = this.category.find(item => item.id === selectedCategoryId);

    this.selectedId = selectedCategoryId;
    this.selectedCategoryName = selectedCategory ? selectedCategory.name : null;
  }

}
