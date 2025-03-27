import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  orderItems = "https://67de95b4471aaaa74284f2c6.mockapi.io/OrderItems"
  vouchersApi = "https://67e310df97fc65f53538a048.mockapi.io/Voucher"
  cartItem = "https://67e310df97fc65f53538a048.mockapi.io/cartItem"
  productsApi = "https://67e3163997fc65f53538b2c5.mockapi.io/Product"
  cartApi = "https://67e3163997fc65f53538b2c5.mockapi.io/Cart"
  categoriesApi = "https://67e3178397fc65f53538b76f.mockapi.io/Category"
  reviewsApi = "https://67e3b18d2ae442db76d124a4.mockapi.io/Cosmetics/Reviews"
  constructor(private http: HttpClient) { }

  ///
  getAllOrderItems() {
    return this.http.get<any[]>(this.orderItems)
  }

  postToOrderItems(data: any) {
    return this.http.post(this.orderItems, data)
  }

  editOrderItems(id: any, data: any) {
    return this.http.put(`${this.orderItems}/${id}`, data)
  }

  deleteOrderItems(id: any) {
    return this.http.delete(`${this.orderItems}/${id}`)
  }

  ///

  getAllVouchers() {
    return this.http.get<any[]>(this.vouchersApi)
  }

  postToVouchers(data: any) {
    return this.http.post(this.vouchersApi, data)
  }

  editVouchers(id: any, data: any) {
    return this.http.put(`${this.vouchersApi}/${id}`, data)
  }

  deleteVouchers(id: any) {
    return this.http.delete(`${this.vouchersApi}/${id}`)
  }

  ///

  getAllCartItems() {
    return this.http.get<any[]>(this.cartItem)
  }

  postToCartItems(data: any) {
    return this.http.post(this.cartItem, data)
  }

  editCartItems(id: any, data: any) {
    return this.http.put(`${this.cartItem}/${id}`, data)
  }

  deleteCartItems(id: any) {
    return this.http.delete(`${this.cartItem}/${id}`)
  }

  ///

  getAllProducts() {
    return this.http.get<any[]>(this.productsApi)
  }

  postToProducts(data: any) {
    return this.http.post(this.productsApi, data)
  }

  editProducts(id: any, data: any) {
    return this.http.put(`${this.productsApi}/${id}`, data)
  }

  deleteProducts(id: any) {
    return this.http.delete(`${this.productsApi}/${id}`)
  }

  ///

  getAllCart() {
    return this.http.get<any[]>(this.cartApi)
  }

  postToCart(data: any) {
    return this.http.post(this.cartApi, data)
  }

  editCart(id: any, data: any) {
    return this.http.put(`${this.cartApi}/${id}`, data)
  }

  deleteCart(id: any) {
    return this.http.delete(`${this.cartApi}/${id}`)
  }

  ///

  getAllCategories() {
    return this.http.get<any[]>(this.categoriesApi)
  }

  postToCategories(data: any) {
    return this.http.post(this.categoriesApi, data)
  }

  editCategory(id: any, data: any) {
    return this.http.put(`${this.categoriesApi}/${id}`, data)
  }

  deleteCategory(id: any) {
    return this.http.delete(`${this.categoriesApi}/${id}`)
  }

  ///

  getAllReviews() {
    return this.http.get<any[]>(this.reviewsApi)
  }

  postToReviews(data: any) {
    return this.http.post(this.reviewsApi, data)
  }

  deleteReview(id: any) {
    return this.http.delete(`${this.reviewsApi}/${id}`)
  }
}
