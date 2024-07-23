import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../../types/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private AppUrl = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }

  // Get all orders
  getOrders(): Observable<any> {
    return this.http.get(this.AppUrl + 'orders');
  }

  // Get order by id
  getOrderById(id: string): Observable<any> {
    return this.http.get(this.AppUrl + 'orders/' + id);
  }

  // Create order
  createOrder(order: Order): Observable<any> {
    return this.http.post(this.AppUrl + 'orders', order);
  }
}
