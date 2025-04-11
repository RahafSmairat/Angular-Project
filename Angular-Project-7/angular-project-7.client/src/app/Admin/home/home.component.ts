import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usersCount: number = 0;
  productsCount: number = 0;
  ordersCount: number = 0;

  private userApi = "https://67d30be18bca322cc268fdac.mockapi.io/users";
  private productsApi = "https://67e3163997fc65f53538b2c5.mockapi.io/Product";
  private ordersApi = "https://67d293c190e0670699be2962.mockapi.io/Orders";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.http.get<any[]>(this.userApi).subscribe(data => {
      this.usersCount = data.length;
    });

    this.http.get<any[]>(this.productsApi).subscribe(data => {
      this.productsCount = data.length;
    });

    this.http.get<any[]>(this.ordersApi).subscribe(data => {
      this.ordersCount = data.length;
    });
  }
}
